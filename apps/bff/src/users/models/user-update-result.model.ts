import { createUnionType } from '@nestjs/graphql';

import { CanNotRegisterUserError } from './can-not-register-user-error.model';
import { User } from './user.model';

export const UserUpdateResult = createUnionType({
  name: 'UserUpdateResult',

  types: () => [User, CanNotRegisterUserError] as const,
});
