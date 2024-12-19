import { Command } from '../../shared';
import { type IRelationEventPublisher, type RelationCreated } from '../event';

export abstract class CreateRelation extends Command {
  private readonly eventPublisher: IRelationEventPublisher;

  protected abstract createRegisterEvent(): RelationCreated;

  public async execute(): Promise<void> {
    const event = this.createRegisterEvent();

    await this.eventPublisher.publish(event);
  }

  public constructor(eventPublisher: IRelationEventPublisher) {
    super();

    this.eventPublisher = eventPublisher;
  }
}
