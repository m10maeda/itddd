import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterCircleError } from './can-not-register-circle-error.model';
import { Circle } from './circle.model';

export const CircleRegistrationResult = createUnionType({
  name: 'CircleRegistrationResult',
  description: 'Circle Registration Result',
  types: () => [Circle, CanNotRegisterCircleError] as const,
});
