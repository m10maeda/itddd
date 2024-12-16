import { JoinedCircleSpecification } from './joined-circle.specification';
import { type CircleDeleted, ICircleEventSubscriber } from '../../../circle';
import { DeleteRelation } from '../../commands';
import { type IRelationEventPublisher } from '../../event';
import { type Relation } from '../../relation';
import { type IRelationRepository } from '../../relation-repository';

export class DeleteRelationIfCircleDeletedProcess
  implements ICircleEventSubscriber<CircleDeleted>
{
  private readonly eventPublisher: IRelationEventPublisher;

  private readonly repository: IRelationRepository;

  public async handle(event: CircleDeleted): Promise<void> {
    const criteria = new JoinedCircleSpecification(event.id);
    const targets = Array.from(await this.repository.findAllBy(criteria));

    await Promise.all(targets.map(async (target) => this.delete(target)));
  }

  private async delete(relation: Relation): Promise<void> {
    const command = new DeleteRelation(relation, this.eventPublisher);

    await command.execute();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    repository: IRelationRepository,
  ) {
    this.eventPublisher = eventPublisher;
    this.repository = repository;
  }
}
