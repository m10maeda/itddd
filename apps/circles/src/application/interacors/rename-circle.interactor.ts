import {
  CircleId,
  CircleName,
  type ICircleEventPublisher,
  type ICircleRepository,
} from '../../domain/models/circle';
import { CircleExistenceService } from '../../domain/services';
import {
  CanNotRenameCircleException,
  CircleNotFoundException,
} from '../use-case/exceptions';
import {
  IRenameCircleUseCaseInputPort,
  type RenameCircleUseCaseInputData,
  RenameCircleUseCaseOutputData,
} from '../use-case/input-ports';

export class RenameCircleInteractor implements IRenameCircleUseCaseInputPort {
  private readonly eventPublisher: ICircleEventPublisher;

  private readonly repository: ICircleRepository;

  private readonly service: CircleExistenceService;

  public async handle(
    input: RenameCircleUseCaseInputData,
  ): Promise<RenameCircleUseCaseOutputData> {
    const circle = await this.repository.getBy(new CircleId(input.id));

    if (circle === undefined) throw new CircleNotFoundException(input.id);

    const newName = new CircleName(input.name);

    const event = circle.renameTo(newName);

    if (await this.service.exists(circle))
      throw new CanNotRenameCircleException(
        circle.id.toString(),
        circle.name.toString(),
      );

    await this.eventPublisher.publish(event);

    return new RenameCircleUseCaseOutputData();
  }

  public constructor(
    repository: ICircleRepository,
    service: CircleExistenceService,
    eventPublisher: ICircleEventPublisher,
  ) {
    this.repository = repository;
    this.service = service;
    this.eventPublisher = eventPublisher;
  }
}
