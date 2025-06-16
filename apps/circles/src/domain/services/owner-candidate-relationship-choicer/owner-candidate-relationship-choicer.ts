import { CanNotChoiceOwnerCandidateRelationshipException } from './can-not-choice-owner-candidate-relationship.exception';
import { CircleId } from '../../models/circle';
import {
  CircleRelationshipSpecification,
  IRelationshipRepository,
  Relationship,
  Role,
  RoleRelationshipSpecification,
} from '../../models/relationship';

export class OwnerCandidateRelationshipChoicer {
  private readonly circleId: CircleId;

  private readonly relationshipRepository: IRelationshipRepository;

  public async choice(): Promise<Relationship> {
    const spec = new CircleRelationshipSpecification(this.circleId).and(
      new RoleRelationshipSpecification(Role.Member),
    );
    const relations = Array.from(
      await this.relationshipRepository.getAllBy(spec),
    );

    if (relations.length === 0)
      throw new CanNotChoiceOwnerCandidateRelationshipException(this.circleId);

    const [candidate] = relations;

    return candidate;
  }

  public constructor(
    circleId: CircleId,
    relationshipRepository: IRelationshipRepository,
  ) {
    this.circleId = circleId;
    this.relationshipRepository = relationshipRepository;
  }
}
