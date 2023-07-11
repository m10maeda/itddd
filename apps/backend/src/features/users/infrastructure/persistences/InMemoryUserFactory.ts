import { InMemorySerialNumberAssigner } from '../../../shared/infrastructure';
import { IUserFactory, User, UserId, UserName } from '../../domain';

export class InMemoryUserFactory implements IUserFactory {
  public async create(name: UserName): Promise<User> {
    const id = this.createUserId();
    const user = new User(id, name);

    return Promise.resolve(user);
  }

  public constructor(serialNumberAssigner: InMemorySerialNumberAssigner) {
    this.serialNumberAssigner = serialNumberAssigner;
  }

  private readonly serialNumberAssigner: InMemorySerialNumberAssigner;

  private createUserId(): UserId {
    const serialNumber = this.serialNumberAssigner.next();

    return new UserId(serialNumber.toString());
  }
}
