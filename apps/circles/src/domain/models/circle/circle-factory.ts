import { type MemberId } from '../member';
import { type Circle } from './circle';
import { type CircleName } from './name/circle-name';

export interface ICircleFactory {
  create(name: CircleName, owner: MemberId): Promise<Circle>;
}
