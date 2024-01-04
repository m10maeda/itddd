import { createUnionType } from '@nestjs/graphql';

import { CircleNotFoundError } from './circle-not-found-error.model';
import { Circle } from './circle.model';

export const CircleResult = createUnionType({
  name: 'CircleResult',
  description: 'Circle result',
  types: () => [Circle, CircleNotFoundError] as const,
});
