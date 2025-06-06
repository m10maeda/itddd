import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, z, createRoute } from '@hono/zod-openapi';
import { paths } from '@itddd/profiles-api';
import { HTTPException } from 'hono/http-exception';
import { Kafka } from 'kafkajs';
import createClient from 'openapi-fetch';

import {
  CircleIdSchema,
  CircleSchema,
  MemberIdSchema,
  ProblemDetail,
} from './schema';
import { MemberDeletedHandler } from '../application/event-handler';
import {
  AddMemberInteractor,
  ChangeOwnerInteractor,
  DeleteCircleInteractor,
  RegisterCircleInteractor,
  RemoveMemberInteractor,
  RenameCircleInteractor,
} from '../application/interacors';
import {
  CanNotRegisterCircleException,
  CanNotRenameCircleException,
  CircleNotFoundException,
} from '../application/use-case/exceptions';
import {
  AddMemberUseCaseInputData,
  ChangeOwnerUseCaseInputData,
  DeleteCircleUseCaseInputData,
  FindAllCirclesUseCaseInputData,
  GetCandidatesUseCaseInputData,
  GetCircleUseCaseInputData,
  RegisterCircleUseCaseInputData,
  RemoveMemberUseCaseInputData,
  RenameCircleUseCaseInputData,
} from '../application/use-case/input-ports';
import {
  CircleAddedMember,
  CircleEvent,
  CircleId,
  CircleName,
  CircleRegistered,
} from '../domain/models/circle';
import { Member, MemberId } from '../domain/models/member';
import { CircleExistenceService } from '../domain/services';
import { CircleEventBus } from '../infrastructure/event-bus/circle-event-bus';
import {
  CircleRepository,
  InMemoryCircleEventStore,
} from '../infrastructure/persistence/circle-repository';
import { InMemoryCircleFactory } from '../infrastructure/persistence/in-memory-circle-factory';
import { MemberExistenceService } from '../infrastructure/persistence/member';
import {
  FindAllCirclesQueryService,
  GetCandidatesQueryService,
  GetCircleQueryService,
  InMemoryCircleDataStore,
} from '../infrastructure/query-service';

const mockCircles = [
  {
    id: '1',
    name: 'Baseball',
    owner: '1',
    members: ['2', '4'],
  },
  {
    id: '2',
    name: 'Football',
    owner: '2',
    members: ['3'],
  },
  {
    id: '3',
    name: 'Tennis',
    owner: '2',
    members: [],
  },
];

const mockEvents = [
  new CircleRegistered(
    new CircleId('1'),
    new CircleName('Baseball'),
    new MemberId('1'),
  ),
  new CircleAddedMember(new CircleId('1'), new MemberId('2')),
  new CircleAddedMember(new CircleId('1'), new MemberId('4')),
  new CircleRegistered(
    new CircleId('2'),
    new CircleName('Football'),
    new MemberId('2'),
  ),
  new CircleAddedMember(new CircleId('2'), new MemberId('3')),
  new CircleRegistered(
    new CircleId('3'),
    new CircleName('Tennis'),
    new MemberId('2'),
  ),
];

const circleDataAccess = new InMemoryCircleDataStore(mockCircles);
const circleEventStore = new InMemoryCircleEventStore(mockEvents);
const circleRepository = new CircleRepository(circleEventStore);
const circleFactory = new InMemoryCircleFactory(mockCircles.length + 1);

const profilesApiClient = createClient<paths>({
  baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
});

const circleExistenceService = new CircleExistenceService(circleRepository);
const memberExistenceService = new MemberExistenceService(profilesApiClient);

const eventBus = new CircleEventBus();

eventBus.subscribe(CircleEvent, circleDataAccess);
eventBus.subscribe(CircleEvent, circleEventStore);

const getCircleUseCase = new GetCircleQueryService(circleDataAccess);
const findAllCirclesUseCase = new FindAllCirclesQueryService(circleDataAccess);
const registerCircleUseCase = new RegisterCircleInteractor(
  circleFactory,
  circleExistenceService,
  eventBus,
);
const renameCircleUseCase = new RenameCircleInteractor(
  circleRepository,
  circleExistenceService,
  eventBus,
);
const deleteCircleUseCase = new DeleteCircleInteractor(
  circleRepository,
  eventBus,
);
const changeOwnerUseCase = new ChangeOwnerInteractor(
  eventBus,
  circleRepository,
  memberExistenceService,
);
const addMemberUseCase = new AddMemberInteractor(
  eventBus,
  circleRepository,
  memberExistenceService,
);
const removeMemberUseCase = new RemoveMemberInteractor(
  eventBus,
  circleRepository,
  memberExistenceService,
);
const getCandidatesUseCase = new GetCandidatesQueryService(
  circleDataAccess,
  profilesApiClient,
);

const memberDeletedHandler = new MemberDeletedHandler(
  circleRepository,
  removeMemberUseCase,
  changeOwnerUseCase,
  deleteCircleUseCase,
);

const kafkaClient = new Kafka({
  brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
  clientId: 'circles',
});

const consumer = kafkaClient.consumer({
  groupId: 'circles',
});

async function subscribe() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'profiles', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`- ${message.key}#${message.value}`);

      if (message.key?.toString() !== 'deleted') return;

      const deletedProfileId = (
        JSON.parse(message.value?.toString() ?? '{}') as { id?: string }
      ).id;

      if (!deletedProfileId) return;

      await memberDeletedHandler.onMemberDeleted(
        new Member(new MemberId(deletedProfileId)),
      );
    },
  });
}

subscribe().catch((err: unknown) => {
  console.error('Error subscribing to Kafka:', err);
});

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
    title: 'Circles API',
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
        description: 'List of circles',
        content: {
          'application/json': {
            schema: z.array(CircleSchema).openapi({
              example: [
                {
                  id: '1',
                  name: 'Baseball',
                  ownerId: '1',
                  memberIds: ['2', '4'],
                },
                {
                  id: '2',
                  name: 'Football',
                  ownerId: '2',
                  memberIds: ['1', '3', '4'],
                },
              ],
            }),
          },
        },
      },
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { circles } = await findAllCirclesUseCase.handle(
      new FindAllCirclesUseCaseInputData(),
    );

    return c.json(
      Array.from(circles).map((circle) => ({
        id: circle.id,
        name: circle.name,
        ownerId: circle.owner,
        memberIds: Array.from(circle.members).map((member) => member),
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
          'application/json': {
            schema: CircleSchema.pick({ name: true, ownerId: true }),
          },
        },
      },
    },
    responses: {
      201: { description: 'Profile registered successfully' },
      400: errorResponses[400],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { name, ownerId } = c.req.valid('json');

    const { registeredId } = await registerCircleUseCase.handle(
      new RegisterCircleUseCaseInputData(name, ownerId),
    );

    return c.body(null, 201, { Location: `/${registeredId}` });
  },
);

const idParams = z.object({
  id: CircleIdSchema.openapi({
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
        description: 'Get a circle by ID',
        content: {
          'application/json': {
            schema: CircleSchema,
          },
        },
      },
      404: errorResponses[404],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    const { circle } = await getCircleUseCase.handle(
      new GetCircleUseCaseInputData(id),
    );

    return c.json(
      {
        id: circle.id,
        name: circle.name,
        ownerId: circle.owner,
        memberIds: Array.from(circle.members),
      },
      200,
    );
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
      204: { description: 'Circle deleted successfully' },
      404: errorResponses[404],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    await deleteCircleUseCase.handle(new DeleteCircleUseCaseInputData(id));

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
          'application/json': { schema: CircleSchema.pick({ name: true }) },
        },
      },
    },
    responses: {
      204: { description: 'Circle updated successfully' },
      400: errorResponses[400],
      404: errorResponses[404],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const { name } = c.req.valid('json');

    await renameCircleUseCase.handle(
      new RenameCircleUseCaseInputData(id, name),
    );

    return c.body(null, 204);
  },
);

app.openapi(
  createRoute({
    method: 'put',
    path: '/{id}/owner',
    request: {
      params: idParams,
      body: {
        content: {
          'application/json': { schema: CircleSchema.pick({ ownerId: true }) },
        },
      },
    },
    responses: {
      204: { description: 'Change circle owner successfully' },
      404: errorResponses[404],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const { ownerId } = c.req.valid('json');

    await changeOwnerUseCase.handle(
      new ChangeOwnerUseCaseInputData(id, ownerId),
    );

    return c.body(null, 204);
  },
);

app.openapi(
  createRoute({
    method: 'post',
    path: '/{id}/members',
    request: {
      params: idParams,
      body: {
        content: {
          'application/json': {
            schema: z.object({
              memberId: MemberIdSchema,
            }),
          },
        },
      },
    },
    responses: {
      204: { description: 'Add member to circle successfully' },
      404: errorResponses[404],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const { memberId } = c.req.valid('json');

    await addMemberUseCase.handle(new AddMemberUseCaseInputData(id, memberId));

    return c.body(null, 204);
  },
);

app.openapi(
  createRoute({
    method: 'delete',
    path: '/{id}/members/{memberId}',
    request: {
      params: z.object({
        id: CircleIdSchema.openapi({
          param: {
            name: 'id',
            in: 'path',
          },
        }),
        memberId: MemberIdSchema.openapi({
          param: {
            name: 'memberId',
            in: 'path',
          },
        }),
      }),
    },
    responses: {
      204: { description: 'Remove member to circle successfully' },
      404: errorResponses[404],
      409: errorResponses[409],
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id, memberId } = c.req.valid('param');

    await removeMemberUseCase.handle(
      new RemoveMemberUseCaseInputData(id, memberId),
    );

    return c.body(null, 204);
  },
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}/candidates',
    request: {
      params: idParams,
    },
    responses: {
      200: {
        description: 'List of circle member candidates',
        content: {
          'application/json': {
            schema: z.array(z.string()).openapi({
              example: ['2', '4'],
            }),
          },
        },
      },
      500: errorResponses[500],
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    const { candidates } = await getCandidatesUseCase.handle(
      new GetCandidatesUseCaseInputData(id),
    );

    return c.json(
      Array.from(candidates).map((candidate) => candidate.id),
      200,
    );
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

  if (err instanceof CircleNotFoundException)
    return c.json(
      {
        title: 'Not Found',
        status: 404,
        detail: err.message,
      },
      404,
      { 'Content-Type': 'application/problem+json' },
    );

  if (err instanceof CanNotRegisterCircleException)
    return c.json(
      {
        title: 'Conflict',
        status: 409,
        detail: err.message,
      },
      400,
      { 'Content-Type': 'application/problem+json' },
    );

  if (err instanceof CanNotRenameCircleException)
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
