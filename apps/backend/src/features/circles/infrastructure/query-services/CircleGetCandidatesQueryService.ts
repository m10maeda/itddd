import {
  JoinedCircleMemberSpecification,
  OwnedCircleMemberSpecification,
} from './specification/member';
import {
  CircleGetCandidatesRequest,
  CircleGetCandidatesResponse,
  CircleNotFoundException,
  ICircleGetCandidatesUseCase,
} from '../../application/usecases';
import {
  CircleId,
  ICircleMemberRepository,
  ICircleRepository,
} from '../../domain';

export class CircleGetCandidatesQueryService
  implements ICircleGetCandidatesUseCase
{
  public async handle(
    request: CircleGetCandidatesRequest,
  ): Promise<CircleGetCandidatesResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id);

    const criteria = new OwnedCircleMemberSpecification(circle)
      .and(new JoinedCircleMemberSpecification(circle))
      .not();
    const candidates = await this.circleMemberRepository.findAllBy(criteria);

    return new CircleGetCandidatesResponse(
      Array.from(candidates).map((member) => member.id.toString()),
    );
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
