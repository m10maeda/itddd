import { Circle } from './Circle';
import { CircleId } from './CircleId';
import { CircleName } from './CircleName';

export interface ICircleRepository {
  findBy(id: CircleId): Promise<Circle>;
  findBy(name: CircleName): Promise<Circle>;
  findAllBy(ids: Iterable<CircleId>): Promise<Iterable<Circle>>;
  findAll(): Promise<Iterable<Circle>>;
  save(circle: Circle): Promise<void>;
  delete(circle: Circle): Promise<void>;
}
