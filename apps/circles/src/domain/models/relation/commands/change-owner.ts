import { Command } from '../../shared';
import { type IRelationEventPublisher } from '../event';
import { type OwnerRelation } from '../owner-relation';
import { CreateOwnerRelation } from './create-owner-relation';
import { DeleteRelation } from './delete-relation';

export class ChangeOwner extends Command {
  private readonly eventPublisher: IRelationEventPublisher;

  private readonly lastOwner: OwnerRelation;

  private readonly newOwner: OwnerRelation;

  public async execute(): Promise<void> {
    const deleteLastOwner = new DeleteRelation(
      this.lastOwner,
      this.eventPublisher,
    );
    const createNewOwner = new CreateOwnerRelation(
      this.newOwner,
      this.eventPublisher,
    );

    await deleteLastOwner.execute();
    await createNewOwner.execute();
  }

  public constructor(
    newOwner: OwnerRelation,
    lastOwner: OwnerRelation,
    eventPublisher: IRelationEventPublisher,
  ) {
    super();

    this.newOwner = newOwner;
    this.lastOwner = lastOwner;
    this.eventPublisher = eventPublisher;
  }
}
