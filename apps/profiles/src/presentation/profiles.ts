import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, z, createRoute } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';

import { id, ProblemDetail, Profile } from './schema';
import { service } from './service';
import {
  CanNotRegisterProfileException,
  CanNotRenameProfileException,
  ProfileNotFoundException,
} from '../application';

const app = new OpenAPIHono({
  defaultHook: (result) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: 'Bad Request',
        cause: result.error,
      });
    }
  },
});

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.1.0',
    title: 'Profiles API',
  },
});

app.get('/ui', swaggerUI({ url: '/doc' }));

const errorResponses = {
  400: {
    description: 'Bad request',
    content: {
      'application/problem+json': {
        schema: ProblemDetail.openapi({
          example: {
            title: 'Bad Request',
            status: 400,
          },
        }),
      },
    },
  },
  404: {
    description: 'Not found',
    content: {
      'application/problem+json': {
        schema: ProblemDetail.openapi({
          example: {
            title: 'Not Found',
            status: 404,
          },
        }),
      },
    },
  },
  409: {
    description: 'Conflict',
    content: {
      'application/problem+json': {
        schema: ProblemDetail.openapi({
          example: {
            title: 'Conflict',
            status: 409,
            detail: 'Profile with this name already exists.',
          },
        }),
      },
    },
  },
  500: {
    description: 'Internal server error',
    content: {
      'application/problem+json': {
        schema: ProblemDetail.openapi({
          example: {
            title: 'Internal Server Error',
            status: 500,
          },
        }),
      },
    },
  },
};

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'List of profiles',
        content: {
          'application/json': {
            schema: z.array(Profile).openapi({
              example: [
                { id: '0', name: 'Alice' },
                { id: '1', name: 'Bob' },
                { id: '2', name: 'Carol' },
              ],
            }),
          },
        },
      },
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const profiles = await service.getAll();

    return c.json(
      Array.from(profiles).map((profile) => ({
        id: profile.id,
        name: profile.name,
      })),
      200,
    );
  },
);

app.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': { schema: Profile.pick({ name: true }) },
        },
      },
    },
    responses: {
      201: {
        description: 'Profile registered successfully',
        headers: {
          Location: {
            description: 'Location of the registered profile',
            schema: {
              type: 'string',
              example: '/1',
            },
          },
        },
        content: {
          'application/json': {
            schema: z
              .object({
                id: z.string().openapi({
                  example: '1',
                }),
              })
              .openapi({
                example: { id: '1' },
              }),
          },
        },
      },
      400: errorResponses[400],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { name } = c.req.valid('json');

    const registeredId = await service.register(name);

    return c.json({ id: registeredId }, 201, { Location: `/${registeredId}` });
  },
);

const idParams = z.object({
  id: id.openapi({
    param: {
      name: 'id',
      in: 'path',
    },
  }),
});

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    request: {
      params: idParams,
    },
    responses: {
      200: {
        description: 'Get a profile by ID',
        content: {
          'application/json': {
            schema: Profile,
          },
        },
      },
      404: errorResponses[404],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    const profile = await service.getBy(id);

    return c.json({ id: profile.id, name: profile.name }, 200);
  },
);

app.openapi(
  createRoute({
    method: 'delete',
    path: '/{id}',
    request: {
      params: idParams,
    },
    responses: {
      204: { description: 'Profile deleted successfully' },
      404: errorResponses[404],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    await service.delete(id);

    return c.body(null, 204);
  },
);

app.openapi(
  createRoute({
    method: 'patch',
    path: '/{id}',
    request: {
      params: idParams,
      body: {
        content: {
          'application/json': { schema: Profile.pick({ name: true }) },
        },
      },
    },
    responses: {
      204: { description: 'Profile updated successfully' },
      400: errorResponses[400],
      404: errorResponses[404],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const { name } = c.req.valid('json');

    await service.rename(id, name);

    return c.body(null, 204);
  },
);

app.onError((err, c) => {
  console.error(err);

  if (err instanceof HTTPException)
    return c.json(
      {
        title: err.message,
        status: err.status,
      },
      400,
      { 'Content-Type': 'application/problem+json' },
    );

  if (err instanceof ProfileNotFoundException)
    return c.json(
      {
        title: 'Not Found',
        status: 404,
        detail: err.message,
      },
      404,
      { 'Content-Type': 'application/problem+json' },
    );

  if (err instanceof CanNotRegisterProfileException)
    return c.json(
      {
        title: 'Conflict',
        status: 409,
        detail: err.message,
      },
      400,
      { 'Content-Type': 'application/problem+json' },
    );

  if (err instanceof CanNotRenameProfileException)
    return c.json(
      {
        title: 'Conflict',
        status: 409,
        detail: err.message,
      },
      400,
      { 'Content-Type': 'application/problem+json' },
    );

  return c.json(
    {
      title: 'Internal Server Error',
      status: 500,
    },
    500,
    { 'Content-Type': 'application/problem+json' },
  );
});

export { app };
