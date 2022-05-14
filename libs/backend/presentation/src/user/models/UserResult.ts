import { createUnionType } from '@nestjs/graphql';

import { User } from './User';
import { UserNotFoundError } from './UserNotFoundError';

export const UserResult = createUnionType({
  name: 'UserResult',
  description: 'User Result',
  types: () => [User, UserNotFoundError] as const,
});
