import {
  CircleName,
  CircleRegistered,
  type ICircleEventPublisher,
  type ICircleFactory,
} from '../../domain/models/circle';
import {
  IMemberExistenceService,
  Member,
  MemberId,
} from '../../domain/models/member';
import {
  IRelationshipEventPublisher,
  Relationship,
  RelationshipCreated,
} from '../../domain/models/relationship';
import { type CircleExistenceService } from '../../domain/services';
import {
  CanNotRegisterCircleException,
  MemberNotFoundException,
} from '../use-case/exceptions';
import {
  IRegisterCircleUseCaseInputPort,
  type RegisterCircleUseCaseInputData,
  RegisterCircleUseCaseOutputData,
} from '../use-case/input-ports';

export class RegisterCircleInteractor
  implements IRegisterCircleUseCaseInputPort
{
  private readonly circleEventPublisher: ICircleEventPublisher;

  private readonly circleExistenceService: CircleExistenceService;

  private readonly circleFactory: ICircleFactory;

  private readonly memberExistenceService: IMemberExistenceService;

  private readonly relationEventPublisher: IRelationshipEventPublisher;

  public async handle(
    input: RegisterCircleUseCaseInputData,
  ): Promise<RegisterCircleUseCaseOutputData> {
    const circle = await this.circleFactory.create(new CircleName(input.name));

    if (await this.circleExistenceService.exists(circle))
      throw new CanNotRegisterCircleException(
        circle.id.toString(),
        circle.name.toString(),
      );

    const owner = new Member(new MemberId(input.owner));

    if (!(await this.memberExistenceService.exists(owner)))
      throw new MemberNotFoundException(owner.id.toString());

    const ownerRelationship = Relationship.createOwnerRelationshipOf(
      circle.id,
      owner.id,
    );

    await this.circleEventPublisher.publish(
      new CircleRegistered(circle.id, circle.name),
    );

    await this.relationEventPublisher.publish(
      new RelationshipCreated(
        ownerRelationship.circleId,
        ownerRelationship.memberId,
        ownerRelationship.role,
      ),
    );

    return new RegisterCircleUseCaseOutputData(circle.id.toString());
  }

  public constructor(
    circleFactory: ICircleFactory,
    circleExistenceService: CircleExistenceService,
    memberExistenceService: IMemberExistenceService,
    circleEventPublisher: ICircleEventPublisher,
    relationEventPublisher: IRelationshipEventPublisher,
  ) {
    this.circleFactory = circleFactory;
    this.circleExistenceService = circleExistenceService;
    this.memberExistenceService = memberExistenceService;
    this.circleEventPublisher = circleEventPublisher;
    this.relationEventPublisher = relationEventPublisher;
  }
}
