import { type Client } from 'openapi-fetch';

import { type ICircleDataAccess } from './circle-data-access';
import { CircleNotFoundException } from '../../application/use-case/exceptions';
import {
  GetCandidatesUseCaseInputData,
  GetCandidatesUseCaseOutputData,
  IGetCandidatesUseCaseInputPort,
} from '../../application/use-case/input-ports';

import type { paths } from '@itddd/profiles-api';

export class GetCandidatesQueryService
  implements IGetCandidatesUseCaseInputPort
{
  private readonly circleDataAccess: ICircleDataAccess;

  private readonly memberDataAccess: Client<paths>;

  public async handle(
    input: GetCandidatesUseCaseInputData,
  ): Promise<GetCandidatesUseCaseOutputData> {
    const circle = await this.circleDataAccess.getBy(input.id);

    if (circle === undefined) throw new CircleNotFoundException(input.id);

    const { data, error } = await this.memberDataAccess.GET('/');

    // TODO: specify error
    if (error) throw new Error();

    const joinedCircleMembers = Array.from([circle.owner, ...circle.members]);
    const notJoinedCircleMembers = Array.from(data).filter(
      (member) => !joinedCircleMembers.includes(member.id),
    );

    return new GetCandidatesUseCaseOutputData(notJoinedCircleMembers);
  }

  public constructor(
    circleDataAccess: ICircleDataAccess,
    memberDataAccess: Client<paths>,
  ) {
    this.circleDataAccess = circleDataAccess;
    this.memberDataAccess = memberDataAccess;
  }
}
