import { type IRelationEventLoader } from './relation-event-loader';
import { CircleId } from '../../../domain/models/circle';
import { type MemberId } from '../../../domain/models/member';
import {
  IRelationRepository,
  type IRelationSpecification,
  MemberRelation,
  OwnerRelation,
  Relation,
  RelationCreated,
  RelationDeleted,
  RelationEvent,
} from '../../../domain/models/relation';

export class RelationRepository implements IRelationRepository {
  private readonly eventLoader: IRelationEventLoader;

  public async findAllBy(
    criteria: IRelationSpecification,
  ): Promise<Iterable<Relation>> {
    const allCreatedEvents = await this.eventLoader.loadAllCreatedEvents();

    const relations = (
      await Promise.all(
        Array.from(allCreatedEvents).map(async (event) =>
          this.getBy(event.circle, event.member),
        ),
      )
    ).filter((relation): relation is Relation => relation !== undefined);

    const chunk = (
      await Promise.all(
        relations.map(async (relation) =>
          (await criteria.isSatisfiedBy(relation)) ? relation : undefined,
        ),
      )
    ).filter((relation): relation is Relation => relation !== undefined);

    return chunk;
  }

  public async getAllBy(circle: CircleId): Promise<Iterable<Relation>>;
  public async getAllBy(member: MemberId): Promise<Iterable<Relation>>;
  public async getAllBy(
    circleOrMember: CircleId | MemberId,
  ): Promise<Iterable<Relation>> {
    // const events = await this.eventLoader.loadAllBy(circleOrMember);
    const createdEvents =
      circleOrMember instanceof CircleId
        ? await this.eventLoader.loadAllCreatedEventsBy(circleOrMember)
        : await this.eventLoader.loadAllCreatedEventsBy(circleOrMember);

    const relations = (
      await Promise.all(
        Array.from(createdEvents).map(async (event) =>
          this.getBy(event.circle, event.member),
        ),
      )
    ).filter((relation): relation is Relation => relation !== undefined);

    return relations;
  }

  public async getBy(
    circle: CircleId,
    member: MemberId,
  ): Promise<Relation | undefined> {
    const events = await this.eventLoader.loadAllBy(circle, member);

    return this.replay(events);
  }

  public async getOwnerRelationBy(
    circle: CircleId,
  ): Promise<Relation | undefined> {
    const createdEvents = await this.eventLoader.loadAllCreatedEventsBy(circle);

    const relation = (
      await Promise.all(
        Array.from(createdEvents).map(async (event) =>
          this.getBy(event.circle, event.member),
        ),
      )
    ).find((relation) => relation !== undefined);

    return relation;
  }

  private replay(events: Iterable<RelationEvent>): Relation | undefined {
    if (Array.from(events).length === 0) return undefined;

    let relation: Relation | undefined;

    Array.from(events).forEach((event) => {
      if (event instanceof RelationCreated) {
        relation = event.type.isOwner()
          ? new OwnerRelation(event.circle, event.member)
          : new MemberRelation(event.circle, event.member);
      }

      if (event instanceof RelationDeleted) {
        relation = undefined;
      }
    });

    return relation;
  }

  public constructor(eventLoader: IRelationEventLoader) {
    this.eventLoader = eventLoader;
  }
}
