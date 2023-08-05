import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterUserError } from './can-not-register-user-error.model';
import { UserNotFoundError } from './user-not-found-error.model';
import { User } from './user.model';

export const UserUpdateResult = createUnionType({
  name: 'UserUpdateResult',
  description: 'User update result model',
  types: () => [User, UserNotFoundError, CanNotRegisterUserError] as const,
});
