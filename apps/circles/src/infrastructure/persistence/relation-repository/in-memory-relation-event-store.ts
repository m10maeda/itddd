import { IRelationEventLoader } from './relation-event-loader';
import { CircleId } from '../../../domain/models/circle';
import { type MemberId } from '../../../domain/models/member';
import {
  type RelationEvent,
  IRelationEventSubscriber,
  RelationCreated,
} from '../../../domain/models/relation';

export class InMemoryRelationEventStore
  implements IRelationEventLoader, IRelationEventSubscriber
{
  private events: RelationEvent[];

  public async handle(event: RelationEvent): Promise<void> {
    this.events = [...this.events, event];

    return Promise.resolve();
  }

  public async loadAllBy(
    circle: CircleId,
    member: MemberId,
  ): Promise<Iterable<RelationEvent>> {
    return Promise.resolve(
      this.events.filter(
        (event) => event.circle.equals(circle) && event.member.equals(member),
      ),
    );
  }

  public async loadAllCreatedEvents(): Promise<Iterable<RelationCreated>> {
    return Promise.resolve(
      this.events.filter((event) => event instanceof RelationCreated),
    );
  }

  public async loadAllCreatedEventsBy(
    circle: CircleId,
  ): Promise<Iterable<RelationEvent>>;
  public async loadAllCreatedEventsBy(
    member: MemberId,
  ): Promise<Iterable<RelationEvent>>;
  public async loadAllCreatedEventsBy(
    circleOrMember: CircleId | MemberId,
  ): Promise<Iterable<RelationEvent>> {
    const events = await this.loadAllCreatedEvents();

    const chunk = Array.from(events).filter((event) => {
      if (circleOrMember instanceof CircleId) {
        return event.circle.equals(circleOrMember);
      }

      return event.member.equals(circleOrMember);
    });

    return Promise.resolve(chunk);
  }

  public constructor(events: Iterable<RelationEvent>) {
    this.events = Array.from(events);
  }
}
