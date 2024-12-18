import { IRelationRepository, Relation } from '../models/relation';

export class RelationExistenceService {
  private readonly repository: IRelationRepository;

  public async exists(relation: Relation): Promise<boolean> {
    const duplicatedRelation = await this.repository.getBy(
      relation.circle,
      relation.member,
    );

    return duplicatedRelation !== undefined;
  }

  public constructor(repository: IRelationRepository) {
    this.repository = repository;
  }
}
