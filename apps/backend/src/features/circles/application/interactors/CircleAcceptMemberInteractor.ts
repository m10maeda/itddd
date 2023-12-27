import {
  ICircleRepository,
  CircleId,
  CircleFullSpecification,
  ICircleMemberRepository,
  CircleMemberId,
} from '../../domain';
import {
  ICircleAcceptMemberUseCase,
  CircleNotFoundException,
  CircleAcceptMemberRequest,
  CircleAcceptMemberResponse,
  CircleMemberNotFoundException,
} from '../usecases';

export class CircleAcceptMemberInteractor
  implements ICircleAcceptMemberUseCase
{
  public async handle(
    request: CircleAcceptMemberRequest,
  ): Promise<CircleAcceptMemberResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id);

    const willAcceptMemberId = new CircleMemberId(request.member);
    const willAcceptMember = await this.circleMemberRepository.findBy(
      willAcceptMemberId,
    );
    if (willAcceptMember === undefined)
      throw new CircleMemberNotFoundException(willAcceptMemberId);

    const joinedMembers = await this.circleMemberRepository.findAllBy(
      circle.id,
    );
    const spec = new CircleFullSpecification(joinedMembers);

    circle.accept(willAcceptMember, spec);

    await this.circleRepository.save(circle);

    return new CircleAcceptMemberResponse();
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
