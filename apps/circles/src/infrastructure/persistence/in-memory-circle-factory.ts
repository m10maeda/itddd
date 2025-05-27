import {
  Circle,
  CircleId,
  type CircleName,
  ICircleFactory,
  Members,
} from '../../domain/models/circle';
import { MemberId } from '../../domain/models/member';

export class InMemoryCircleFactory implements ICircleFactory {
  private serialNumber: number;

  public async create(name: CircleName, owner: MemberId): Promise<Circle> {
    const id = new CircleId(this.serialNumber.toString());
    const circle = new Circle(id, name, owner, new Members([]));

    this.serialNumber += 1;

    return Promise.resolve(circle);
  }

  public constructor(initialSerialNumber = 0) {
    this.serialNumber = initialSerialNumber;
  }
}
