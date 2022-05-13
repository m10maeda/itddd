import { InMemorySerialNumberAssigner } from '@itddd/backend-feature-shared';
import { User } from '@itddd/backend-feature-user';

import {
  Circle,
  CircleId,
  CircleName,
  ICircleFactory,
} from '../../domain/models';

export class InMemoryCircleFactory implements ICircleFactory {
  public async create(name: CircleName, owner: User): Promise<Circle> {
    const id = this.createCircleId();
    const circle = new Circle(id, name, owner.id);

    return Promise.resolve(circle);
  }

  public constructor(serialNumberAssigner: InMemorySerialNumberAssigner) {
    this.serialNumberAssigner = serialNumberAssigner;
  }

  private createCircleId(): CircleId {
    const serialNumber = this.serialNumberAssigner.next();

    return new CircleId(`${serialNumber}`);
  }

  private readonly serialNumberAssigner: InMemorySerialNumberAssigner;
}
