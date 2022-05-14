import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterUserError } from './CanNotRegisterUserError';
import { User } from './User';
import { UserNotFoundError } from './UserNotFoundError';

export const UserRegistrationResult = createUnionType({
  name: 'UserRegistrationResult',
  description: 'User Registration Result',
  types: () => [User, UserNotFoundError, CanNotRegisterUserError] as const,
});
