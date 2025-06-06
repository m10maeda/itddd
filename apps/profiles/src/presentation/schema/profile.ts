import { z } from '@hono/zod-openapi';

export const id = z.string().openapi({
  description: 'Unique identifier for the profile',
  example: '0',
});

export const name = z.string().min(3).max(20).openapi({
  description: 'Name of the profile',
  example: 'Alice',
});

export const Profile = z
  .object({
    id,
    name,
  })
  .openapi({
    description: 'Profile',
  });
