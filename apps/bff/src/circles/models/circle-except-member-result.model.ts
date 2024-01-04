import { createUnionType } from '@nestjs/graphql';

import { CircleNotFoundError } from './circle-not-found-error.model';
import { Circle } from './circle.model';
import { UserNotFoundError } from '../../users';

export const CircleExceptMemberResult = createUnionType({
  name: 'CircleExceptMemberResult',
  description: 'Circle except member result model',
  types: () => [Circle, CircleNotFoundError, UserNotFoundError] as const,
});
