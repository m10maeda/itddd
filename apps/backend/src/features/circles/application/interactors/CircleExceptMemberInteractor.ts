import {
  ICircleRepository,
  CircleId,
  ICircleMemberRepository,
  CircleMemberId,
} from '../../domain';
import {
  ICircleExceptMemberUseCase,
  CircleNotFoundException,
  CircleExceptMemberRequest,
  CircleExceptMemberResponse,
  CircleMemberNotFoundException,
} from '../usecases';

export class CircleExceptMemberInteractor
  implements ICircleExceptMemberUseCase
{
  public async handle(
    request: CircleExceptMemberRequest,
  ): Promise<CircleExceptMemberResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id);

    const willExceptMemberId = new CircleMemberId(request.member);
    const willExceptMember = await this.circleMemberRepository.findBy(
      willExceptMemberId,
    );
    if (willExceptMember === undefined)
      throw new CircleMemberNotFoundException(willExceptMemberId);

    circle.except(willExceptMember);

    await this.circleRepository.save(circle);

    return new CircleExceptMemberResponse();
  }

  public constructor(
    circleRepository: ICircleRepository,
    circleMemberRepository: ICircleMemberRepository,
  ) {
    this.circleRepository = circleRepository;
    this.circleMemberRepository = circleMemberRepository;
  }

  private readonly circleRepository: ICircleRepository;

  private readonly circleMemberRepository: ICircleMemberRepository;
}
