import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterCircleError } from './can-not-register-circle-error.model';
import { CircleNotFoundError } from './circle-not-found-error.model';
import { Circle } from './circle.model';

export const CircleUpdateResult = createUnionType({
  name: 'CircleUpdateResult',
  description: 'Circle update result model',
  types: () =>
    [Circle, CircleNotFoundError, CanNotRegisterCircleError] as const,
});
