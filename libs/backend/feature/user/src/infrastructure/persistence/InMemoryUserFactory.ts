import { InMemorySerialNumberAssigner } from '@itddd/backend-feature-shared';

import { IUserFactory, User, UserId, UserName } from '../../domain/models';

export class InMemoryUserFactory implements IUserFactory {
  public async create(name: UserName): Promise<User> {
    const id = this.createUserId();
    const user = new User(id, name);

    return Promise.resolve(user);
  }

  public constructor(serialNumberAssigner: InMemorySerialNumberAssigner) {
    this.serialNumberAssigner = serialNumberAssigner;
  }

  private createUserId(): UserId {
    const serialNumber = this.serialNumberAssigner.next();

    return new UserId(`${serialNumber}`);
  }

  private readonly serialNumberAssigner: InMemorySerialNumberAssigner;
}
