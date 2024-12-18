import { Relation } from './relation';
import { IRelationRepository } from './relation-repository';
import { RelationSpecification } from './relation.specification';

export class CircleFullSpecification extends RelationSpecification {
  private readonly repository: IRelationRepository;

  public async isSatisfiedBy(target: Relation): Promise<boolean> {
    const relations = Array.from(await this.repository.getAllBy(target.circle));

    return relations.length > 30;
  }

  public constructor(repository: IRelationRepository) {
    super();

    this.repository = repository;
  }
}
