import { createUnionType } from '@nestjs/graphql';

import { UserNotFoundError } from '../../user/models';
import { CanNotRegisterCircleError } from './CanNotRegisterCircleError';
import { Circle } from './Circle';
import { CircleNotFoundError } from './CircleNotFoundError';

export const CircleRegistrationResult = createUnionType({
  name: 'CircleRegistrationResult',
  description: 'Circle Registration Result',
  types: () =>
    [
      Circle,
      CanNotRegisterCircleError,
      CircleNotFoundError,
      UserNotFoundError,
    ] as const,
});
