import { type ISpecification, Specification } from '../../shared';

import type { Relationship } from '../relationship';

export interface IRelationSpecification extends ISpecification<Relationship> {}

export abstract class RelationshipSpecification
  extends Specification<Relationship>
  implements IRelationSpecification {}
