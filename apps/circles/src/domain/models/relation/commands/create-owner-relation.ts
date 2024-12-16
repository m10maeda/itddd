import { type IRelationEventPublisher, RelationCreated } from '../event';
import { type OwnerRelation } from '../owner-relation';
import { RelationType } from '../relation-type';
import { CreateRelation } from './create-relation';

export class CreateOwnerRelation extends CreateRelation {
  private readonly target: OwnerRelation;

  protected createRegisterEvent(): RelationCreated {
    return new RelationCreated(
      this.target.circle,
      this.target.member,
      RelationType.Owner,
    );
  }

  public constructor(
    target: OwnerRelation,
    eventPublisher: IRelationEventPublisher,
  ) {
    super(eventPublisher);

    this.target = target;
  }
}
