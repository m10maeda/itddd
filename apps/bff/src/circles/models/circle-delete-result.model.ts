import { createUnionType } from '@nestjs/graphql';

import { CircleDelete } from './circle-delete.model';
import { CircleNotFoundError } from './circle-not-found-error.model';

export const CircleDeleteResult = createUnionType({
  name: 'CircleDeleteResult',
  description: 'Circle delete result',
  types: () => [CircleDelete, CircleNotFoundError] as const,
});
