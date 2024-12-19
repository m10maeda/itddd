import { type CircleRegistered, ICircleEventSubscriber } from '../../../circle';
import { CreateOwnerRelation } from '../../commands';
import { type IRelationEventPublisher } from '../../event';
import { OwnerRelation } from '../../owner-relation';

export class CreateOwnerRelationIfCircleRegisteredProcess
  implements ICircleEventSubscriber<CircleRegistered>
{
  private readonly eventPublisher: IRelationEventPublisher;

  public async handle(event: CircleRegistered): Promise<void> {
    const command = new CreateOwnerRelation(
      new OwnerRelation(event.id, event.owner),
      this.eventPublisher,
    );

    await command.execute();
  }

  public constructor(eventPublisher: IRelationEventPublisher) {
    this.eventPublisher = eventPublisher;
  }
}
