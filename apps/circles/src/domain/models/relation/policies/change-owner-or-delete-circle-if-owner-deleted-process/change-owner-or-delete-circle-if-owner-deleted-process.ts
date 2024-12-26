import {
  DeleteCircle,
  ICircleEventPublisher,
  type ICircleRepository,
} from '../../../circle';
import { CreateOwnerRelation, DeleteRelation } from '../../commands';
import {
  type IRelationEventPublisher,
  IRelationEventSubscriber,
  type RelationDeleted,
} from '../../event';
import { type IRelationRepository } from '../../relation-repository';

export class ChangeOwnerOrDeleteCircleIfOwnerDeletedProcess
  implements IRelationEventSubscriber<RelationDeleted>
{
  private readonly circleEventPublisher: ICircleEventPublisher;

  private readonly circleRepository: ICircleRepository;

  private readonly relationEventPublisher: IRelationEventPublisher;

  private readonly relationRepository: IRelationRepository;

  public async handle(event: RelationDeleted): Promise<void> {
    console.log('ChangeOwnerProcess catch', event);

    if (!event.type.isOwner()) return;

    const circle = await this.circleRepository.getBy(event.circle);

    // TODO: specify error
    if (circle === undefined)
      throw new Error(
        'Can not change owner, because circle with deleted owner is not found.',
      );

    const relations = await this.relationRepository.getAllBy(circle.id);
    const candidates = Array.from(relations).filter(
      (relation) => !relation.isOwner(),
    );

    const candidate = candidates[0];

    if (candidate === undefined) {
      const deleteCircle = new DeleteCircle(circle, this.circleEventPublisher);
      await deleteCircle.execute();

      return;
    }

    const deleteMemberRelationCommand = new DeleteRelation(
      candidate,
      this.relationEventPublisher,
    );

    await deleteMemberRelationCommand.execute();

    const createOwnerRelationCommand = new CreateOwnerRelation(
      candidate,
      this.relationEventPublisher,
    );

    await createOwnerRelationCommand.execute();
  }

  public constructor(
    relationEventPublisher: IRelationEventPublisher,
    circleEventPublisher: ICircleEventPublisher,
    relationRepository: IRelationRepository,
    circleRepository: ICircleRepository,
  ) {
    this.relationEventPublisher = relationEventPublisher;
    this.circleEventPublisher = circleEventPublisher;
    this.relationRepository = relationRepository;
    this.circleRepository = circleRepository;
  }
}
