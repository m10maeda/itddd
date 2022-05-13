import { User } from '@itddd/backend-feature-user';

import { Circle } from './Circle';
import { CircleName } from './CircleName';

export interface ICircleFactory {
  create(name: CircleName, owner: User): Promise<Circle>;
}
