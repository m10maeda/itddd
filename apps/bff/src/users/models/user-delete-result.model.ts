import { createUnionType } from '@nestjs/graphql';

import { UserDelete } from './user-delete.model';
import { UserNotFoundError } from './user-not-found-error.model';

export const UserDeleteResult = createUnionType({
  name: 'UserDeleteResult',
  description: 'User delete result',
  types: () => [UserDelete, UserNotFoundError] as const,
});
