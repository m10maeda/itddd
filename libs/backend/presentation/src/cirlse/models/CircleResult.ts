import { createUnionType } from '@nestjs/graphql';

import { UserNotFoundError } from '../../user/models';
import { Circle } from './Circle';
import { CircleNotFoundError } from './CircleNotFoundError';

export const CircleResult = createUnionType({
  name: 'CircleResult',
  description: 'Circle Result',
  types: () => [Circle, CircleNotFoundError, UserNotFoundError] as const,
});
