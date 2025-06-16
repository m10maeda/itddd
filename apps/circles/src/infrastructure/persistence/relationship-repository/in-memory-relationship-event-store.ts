import { IRelationshipEventLoader } from './relationship-event-loader';
import { CircleId } from '../../../domain/models/circle';
import { MemberId } from '../../../domain/models/member';
import {
  IRelationshipEventSubscriber,
  RelationshipCreated,
  RelationshipEvent,
} from '../../../domain/models/relationship';

export class InMemoryRelationshipEventStore
  implements IRelationshipEventLoader, IRelationshipEventSubscriber
{
  private readonly events: RelationshipEvent[];

  public async handle(event: RelationshipEvent): Promise<void> {
    this.events.push(event);

    return Promise.resolve();
  }

  public async loadAll(): Promise<RelationshipEvent[]> {
    return Promise.resolve(this.events);
  }

  public async loadAllBy(
    circleId: CircleId,
    memberId: MemberId,
  ): Promise<RelationshipEvent[]> {
    return Promise.resolve(
      this.events.filter(
        (event) =>
          event.circleId.equals(circleId) && event.memberId.equals(memberId),
      ),
    );
  }

  public async loadAllCreated(): Promise<RelationshipCreated[]> {
    return Promise.resolve(
      this.events.filter(
        (event): event is RelationshipCreated =>
          event instanceof RelationshipCreated,
      ),
    );
  }

  public constructor(events: Iterable<RelationshipEvent>) {
    this.events = Array.from(events);
  }
}
