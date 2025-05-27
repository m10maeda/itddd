import {
  CircleDeleted,
  CircleId,
  type ICircleEventPublisher,
  type ICircleRepository,
} from '../../domain/models/circle';
import { CircleNotFoundException } from '../use-case/exceptions';
import {
  type DeleteCircleUseCaseInputData,
  DeleteCircleUseCaseOutputData,
  IDeleteCircleUseCaseInputPort,
} from '../use-case/input-ports';

export class DeleteCircleInteractor implements IDeleteCircleUseCaseInputPort {
  private readonly eventPublisher: ICircleEventPublisher;

  private readonly repository: ICircleRepository;

  public async handle(
    input: DeleteCircleUseCaseInputData,
  ): Promise<DeleteCircleUseCaseOutputData> {
    const circle = await this.repository.getBy(new CircleId(input.id));

    if (circle === undefined) throw new CircleNotFoundException(input.id);

    const event = new CircleDeleted(circle.id);

    await this.eventPublisher.publish(event);

    return new DeleteCircleUseCaseOutputData();
  }

  public constructor(
    repository: ICircleRepository,
    eventPublisher: ICircleEventPublisher,
  ) {
    this.repository = repository;
    this.eventPublisher = eventPublisher;
  }
}
