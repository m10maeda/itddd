import { InMemorySerialNumberAssigner } from '../../../shared/infrastructure';
import {
  ICircleFactory,
  Circle,
  CircleId,
  CircleName,
  CircleMembers,
  CircleMember,
} from '../../domain';

export class InMemoryCircleFactory implements ICircleFactory {
  public async create(name: CircleName, owner: CircleMember): Promise<Circle> {
    const id = this.createCircleId();
    const circle = new Circle(id, name, new CircleMembers(owner.id));

    return Promise.resolve(circle);
  }

  public constructor(serialNumberAssigner: InMemorySerialNumberAssigner) {
    this.serialNumberAssigner = serialNumberAssigner;
  }

  private readonly serialNumberAssigner: InMemorySerialNumberAssigner;

  private createCircleId(): CircleId {
    const serialNumber = this.serialNumberAssigner.next();

    return new CircleId(serialNumber.toString());
  }
}
