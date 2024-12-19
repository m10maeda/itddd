import {
  CircleName,
  CircleRegistered,
  type ICircleEventPublisher,
  type ICircleFactory,
} from '../../domain/models/circle';
import { MemberId } from '../../domain/models/member';
import { type CircleExistenceService } from '../../domain/services';
import { CanNotRegisterCircleException } from '../use-case/exceptions';
import {
  IRegisterCircleUseCaseInputPort,
  type RegisterCircleUseCaseInputData,
  RegisterCircleUseCaseOutputData,
} from '../use-case/input-ports';

export class RegisterCircleInteractor
  implements IRegisterCircleUseCaseInputPort
{
  private readonly eventPublisher: ICircleEventPublisher;

  private readonly factory: ICircleFactory;

  private readonly service: CircleExistenceService;

  public async handle(
    input: RegisterCircleUseCaseInputData,
  ): Promise<RegisterCircleUseCaseOutputData> {
    const circle = await this.factory.create(new CircleName(input.name));

    if (await this.service.exists(circle))
      throw new CanNotRegisterCircleException(
        circle.id.toString(),
        circle.name.toString(),
      );

    const ownerId = new MemberId(input.owner);
    const event = new CircleRegistered(circle.id, circle.name, ownerId);

    await this.eventPublisher.publish(event);

    return new RegisterCircleUseCaseOutputData(circle.id.toString());
  }

  public constructor(
    factory: ICircleFactory,
    service: CircleExistenceService,
    eventPublisher: ICircleEventPublisher,
  ) {
    this.factory = factory;
    this.service = service;
    this.eventPublisher = eventPublisher;
  }
}
