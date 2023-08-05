import { createUnionType } from '@nestjs/graphql';

import { UserNotFoundError } from './user-not-found-error.model';
import { User } from './user.model';

export const UserResult = createUnionType({
  name: 'UserResult',
  description: 'User result',
  types: () => [User, UserNotFoundError] as const,
});
