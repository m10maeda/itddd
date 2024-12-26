import { Command } from '../../shared';
import { IRelationEventPublisher, RelationDeleted } from '../event';
import { Relation } from '../relation';

export class DeleteRelation extends Command {
  private readonly eventPublisher: IRelationEventPublisher;

  private readonly target: Relation;

  public async execute(): Promise<void> {
    const event = new RelationDeleted(
      this.target.circle,
      this.target.member,
      this.target.type,
    );

    await this.eventPublisher.publish(event);
  }

  public constructor(
    target: Relation,
    eventPublisher: IRelationEventPublisher,
  ) {
    super();

    this.target = target;
    this.eventPublisher = eventPublisher;
  }
}
