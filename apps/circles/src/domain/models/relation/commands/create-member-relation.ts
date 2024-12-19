import { type IRelationEventPublisher, RelationCreated } from '../event';
import { type MemberRelation } from '../member-relation';
import { RelationType } from '../relation-type';
import { CreateRelation } from './create-relation';

export class CreateMemberRelation extends CreateRelation {
  private readonly target: MemberRelation;

  protected createRegisterEvent(): RelationCreated {
    return new RelationCreated(
      this.target.circle,
      this.target.member,
      RelationType.Member,
    );
  }

  public constructor(
    target: MemberRelation,
    eventPublisher: IRelationEventPublisher,
  ) {
    super(eventPublisher);

    this.target = target;
  }
}
