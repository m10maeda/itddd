import { type ICircleRepository, type Circle } from '../models';

export class CircleService {
  public async exists(circle: Circle): Promise<boolean> {
    const duplicatedCircle = await this.circleRepository.findBy(circle.name);

    return duplicatedCircle !== undefined;
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  private readonly circleRepository: ICircleRepository;
}
