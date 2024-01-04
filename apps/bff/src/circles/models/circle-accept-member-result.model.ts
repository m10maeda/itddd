import { createUnionType } from '@nestjs/graphql';

import { CanNotAcceptCircleMemberError } from './can-not-accept-circle-member-error.model';
import { CircleNotFoundError } from './circle-not-found-error.model';
import { Circle } from './circle.model';
import { UserNotFoundError } from '../../users';

export const CircleAcceptMemberResult = createUnionType({
  name: 'CircleAcceptMemberResult',
  description: 'Circle accept member result model',
  types: () =>
    [
      Circle,
      CircleNotFoundError,
      UserNotFoundError,
      CanNotAcceptCircleMemberError,
    ] as const,
});
