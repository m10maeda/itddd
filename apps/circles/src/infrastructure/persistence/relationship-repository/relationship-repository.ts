import { IRelationshipEventLoader } from './relationship-event-loader';
import { CircleId } from '../../../domain/models/circle';
import { MemberId } from '../../../domain/models/member';
import {
  IRelationshipRepository,
  IRelationSpecification,
  Relationship,
  RelationshipChangedRole,
  RelationshipCreated,
  RelationshipDeleted,
  RelationshipEvent,
} from '../../../domain/models/relationship';

export class RelationshipRepository implements IRelationshipRepository {
  private readonly eventLoader: IRelationshipEventLoader;
  public async getAllBy(
    criteria: IRelationSpecification,
  ): Promise<Iterable<Relationship>> {
    const relationships = await this.getAllRelationships();

    const chunk = (
      await Promise.all(
        relationships.map(async (relationship) => ({
          relationship,
          satisfied: await criteria.isSatisfiedBy(relationship),
        })),
      )
    )
      .filter((result) => result.satisfied)
      .map(({ relationship }) => relationship);

    return chunk;
  }

  public async getBy(
    circleId: CircleId,
    memberId: MemberId,
  ): Promise<Relationship | undefined> {
    const events = await this.eventLoader.loadAllBy(circleId, memberId);

    return this.replay(events);
  }

  public async getOwnerBy(
    circleId: CircleId,
  ): Promise<Relationship | undefined> {
    const relationships = await this.getAllRelationships();

    const target = relationships
      .filter((relationship) => relationship.isOwner())
      .find((relationship) => relationship.circleId.equals(circleId));

    return target;
  }

  private async getAllRelationships(): Promise<Relationship[]> {
    const allCreatedEvents = await this.eventLoader.loadAllCreated();

    const relationships = (
      await Promise.all(
        allCreatedEvents.map(async (createdEvent) => {
          const events = await this.eventLoader.loadAllBy(
            createdEvent.circleId,
            createdEvent.memberId,
          );

          return this.replay(events);
        }),
      )
    ).filter((relationship) => relationship !== undefined);

    return relationships;
  }

  private replay(events: RelationshipEvent[]): Relationship | undefined {
    if (events.length === 0) return undefined;

    const deletedEvent = events.find(
      (event) => event instanceof RelationshipDeleted,
    );

    if (deletedEvent) return undefined;

    const createdEvent = events.find(
      (event) => event instanceof RelationshipCreated,
    );

    if (createdEvent === undefined) return undefined;

    const relationship = new Relationship(
      createdEvent.circleId,
      createdEvent.memberId,
      createdEvent.role,
    );

    const changedEvents = events.filter(
      (event) => event instanceof RelationshipChangedRole,
    );

    changedEvents.forEach((event) => {
      relationship.change(event.role);
    });

    return relationship;
  }

  public constructor(eventLoader: IRelationshipEventLoader) {
    this.eventLoader = eventLoader;
  }
}
