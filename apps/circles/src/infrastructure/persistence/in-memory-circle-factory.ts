import {
  Circle,
  CircleId,
  type CircleName,
  ICircleFactory,
} from '../../domain/models/circle';

export class InMemoryCircleFactory implements ICircleFactory {
  private serialNumber: number;

  public async create(name: CircleName): Promise<Circle> {
    const id = new CircleId(this.serialNumber.toString());
    const circle = new Circle(id, name);

    this.serialNumber += 1;

    return Promise.resolve(circle);
  }

  public constructor(initialSerialNumber = 0) {
    this.serialNumber = initialSerialNumber;
  }
}
