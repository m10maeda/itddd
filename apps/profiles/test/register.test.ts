import { createMock } from '@golevelup/ts-jest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { Profile, ProfileId, ProfileName } from '../src/domain/models';
import {
  PROFILE_FACTORY,
  PROFILE_REPOSITORY,
} from '../src/infrastructure/infrastructure.module';
import { Messenger } from '../src/infrastructure/messenger';
import { MESSENGER } from '../src/infrastructure/messenger/messenger.module';
import {
  InMemoryProfileFactory,
  InMemoryProfileRepository,
} from '../src/infrastructure/persistence';

describe('Delete profile use case', () => {
  let app: INestApplication;

  const mockProfiles = [
    new Profile(new ProfileId('0'), new ProfileName('Alice')),
    new Profile(new ProfileId('1'), new ProfileName('Bob')),
    new Profile(new ProfileId('2'), new ProfileName('Carol')),
    new Profile(new ProfileId('3'), new ProfileName('Dave')),
  ] as const satisfies Profile[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PROFILE_REPOSITORY)
      .useValue(new InMemoryProfileRepository(mockProfiles))
      .overrideProvider(PROFILE_FACTORY)
      .useValue(new InMemoryProfileFactory(mockProfiles.length))
      .overrideProvider(MESSENGER)
      .useValue(createMock<Messenger>())

      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when profile can be registered', () => {
    async function act() {
      const name = 'Frank';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).post('/').send({ name });
    }

    it('should return 201 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.CREATED);
    });

    it('should return location with registered resource in response header', async () => {
      const result = await act();

      expect(result.headers).toHaveProperty('location', '/4');
    });
  });

  describe('when the specified name is 3 characters short', () => {
    async function act() {
      const name = 'ab';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).post('/').send({ name });
    }

    it('should return 400 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('when the specified name is 20 characters long', () => {
    async function act() {
      const name = 'abcdefghijklmnopqrstu';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).post('/').send({ name });
    }

    it('should return 400 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('when the specified name is already existed', () => {
    async function act() {
      const name = 'Alice';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).post('/').send({ name });
    }

    it('should return 409 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.CONFLICT);
    });
  });
});
