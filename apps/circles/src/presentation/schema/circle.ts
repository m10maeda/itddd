import { z } from '@hono/zod-openapi';

export const CircleIdSchema = z.string().openapi({
  description: 'Unique identifier for the circle',
  example: '1',
});

export const CircleNameSchema = z.string().nonempty().max(20).openapi({
  description: 'Name of the circle',
  example: 'Baseball',
});

export const MemberIdSchema = z.string().openapi({
  description: 'Unique identifier for the member',
  example: '1',
});

export const CircleSchema = z
  .object({
    id: CircleIdSchema,
    name: CircleNameSchema,
    ownerId: MemberIdSchema,
    memberIds: z.array(MemberIdSchema).openapi({
      description: 'List of member IDs in the circle',
      example: ['2', '4'],
    }),
  })
  .openapi({
    description: 'Circle',
  });
