import { ChangeOwner } from '../../commands';
import {
  type IRelationEventPublisher,
  IRelationEventSubscriber,
  type RelationDeleted,
} from '../../event';
import { type IRelationRepository } from '../../relation-repository';

export class ChangeOwnerIfOwnerDeletedProcess
  implements IRelationEventSubscriber<RelationDeleted>
{
  private readonly eventPublisher: IRelationEventPublisher;

  private readonly relationRepository: IRelationRepository;

  public async handle(event: RelationDeleted): Promise<void> {
    const ownerRelation = await this.relationRepository.getOwnerRelationBy(
      event.circle,
    );

    if (!ownerRelation?.member.equals(event.member)) return;

    const relations = await this.relationRepository.getAllBy(event.circle);
    const candidates = Array.from(relations).filter(
      (relation) => !relation.isOwner(),
    );
    const candidate = candidates[0];

    if (candidate === undefined) return;

    const command = new ChangeOwner(
      candidate,
      ownerRelation,
      this.eventPublisher,
    );

    await command.execute();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    relationRepository: IRelationRepository,
  ) {
    this.eventPublisher = eventPublisher;
    this.relationRepository = relationRepository;
  }
}
