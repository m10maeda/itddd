import { type Circle, type ICircleRepository } from '../models/circle';

export class CircleExistenceService {
  private readonly repository: ICircleRepository;

  public async exists(circle: Circle): Promise<boolean> {
    const duplicatedCircle = await this.repository.getBy(circle.name);

    return duplicatedCircle !== undefined;
  }

  public constructor(repository: ICircleRepository) {
    this.repository = repository;
  }
}
