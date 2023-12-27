import {
  type Circle,
  type CircleId,
  type CircleName,
  type ICircleSpecification,
} from './circle';

export interface ICircleRepository {
  findBy(id: CircleId): Promise<Circle | undefined>;
  findBy(name: CircleName): Promise<Circle | undefined>;
  findAllBy(criteria: ICircleSpecification): Promise<Iterable<Circle>>;
  save(circle: Circle): Promise<void>;
  delete(circle: Circle): Promise<void>;
}
