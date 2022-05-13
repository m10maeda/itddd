import { ICircleRepository, Circle } from '../models';

export class CircleService {
  private readonly circleRepository: ICircleRepository;

  public async exists(circle: Circle): Promise<boolean> {
    const duplicatedCircle = await this.circleRepository.findBy(circle.name);

    return duplicatedCircle !== undefined;
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }
}
