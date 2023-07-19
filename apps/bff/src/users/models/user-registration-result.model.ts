import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterUserError } from './can-not-register-user-error.model';
import { User } from './user.model';

export const UserRegistrationResult = createUnionType({
  name: 'UserRegistrationResult',
  description: 'User Registration Result',
  types: () => [User, CanNotRegisterUserError] as const,
});
