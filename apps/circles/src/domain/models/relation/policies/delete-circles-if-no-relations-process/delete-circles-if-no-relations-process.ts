import {
  DeleteCircle,
  type ICircleEventPublisher,
  type ICircleRepository,
} from '../../../circle';
import { IRelationEventSubscriber, type RelationDeleted } from '../../event';
import { type IRelationRepository } from '../../relation-repository';

export class DeleteCirclesIfNoRelationsProcess
  implements IRelationEventSubscriber<RelationDeleted>
{
  private readonly circleEventPublisher: ICircleEventPublisher;

  private readonly circleRepository: ICircleRepository;

  private readonly relationRepository: IRelationRepository;

  public async handle(event: RelationDeleted): Promise<void> {
    const relations = Array.from(
      await this.relationRepository.getAllBy(event.circle),
    );

    if (relations.length > 0) return;

    const target = await this.circleRepository.getBy(event.circle);

    if (target === undefined) return;

    const command = new DeleteCircle(target, this.circleEventPublisher);

    await command.execute();
  }

  public constructor(
    circleEventPublisher: ICircleEventPublisher,
    circleRepository: ICircleRepository,
    relationRepository: IRelationRepository,
  ) {
    this.circleEventPublisher = circleEventPublisher;
    this.circleRepository = circleRepository;
    this.relationRepository = relationRepository;
  }
}
