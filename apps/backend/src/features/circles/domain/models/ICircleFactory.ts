import { type Circle, type CircleName } from './circle';
import { type CircleMember } from './member';

export interface ICircleFactory {
  create(name: CircleName, owner: CircleMember): Promise<Circle>;
}
