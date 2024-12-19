import { ISpecification, Specification } from '../shared';
import { type Relation } from './relation';

export interface IRelationSpecification extends ISpecification<Relation> {}

export abstract class RelationSpecification
  extends Specification<Relation>
  implements IRelationSpecification {}
