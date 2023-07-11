import { IUserRepository, User } from '../models';

export class UserService {
  public async exists(user: User): Promise<boolean> {
    const duplicatedUser = await this.userRepository.findBy(user.name);

    return duplicatedUser !== undefined;
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
