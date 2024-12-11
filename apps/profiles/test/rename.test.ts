import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { Profile, ProfileId, ProfileName } from '../src/domain/models';
import { PROFILE_REPOSITORY } from '../src/infrastructure/infrastructure.module';
import { InMemoryProfileRepository } from '../src/infrastructure/persistence';

describe('Rename profile use case', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PROFILE_REPOSITORY)
      .useValue(
        new InMemoryProfileRepository([
          new Profile(new ProfileId('0'), new ProfileName('Alice')),
          new Profile(new ProfileId('1'), new ProfileName('Bob')),
          new Profile(new ProfileId('2'), new ProfileName('Carol')),
          new Profile(new ProfileId('3'), new ProfileName('Dave')),
        ]),
      )
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when profile can be renamed', () => {
    const newName = 'Frank';

    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).put('/0').send({ name: newName });
    }

    it('should return 204 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('should rename profile the specified id to the specified name', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const preResult = await request(app.getHttpServer()).get('/0');

      expect(preResult.body).not.toHaveProperty('name', newName);

      await act();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/0');

      expect(result.body).toHaveProperty('name', newName);
    });
  });

  describe('when profile with the specified id does not not existed', () => {
    async function act() {
      const newName = 'Frank';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer())
        .put('/unknown')
        .send({ name: newName });
    }

    it('should return 404 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('when the specified name is 3 characters short', () => {
    async function act() {
      const newName = 'ab';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).put('/0').send({ name: newName });
    }

    it('should return 400 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('when the specified name is 20 characters long', () => {
    async function act() {
      const newName = 'abcdefghijklmnopqrstu';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).put('/0').send({ name: newName });
    }

    it('should return 400 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('when the specified name is already existed', () => {
    async function act() {
      const newName = 'Bob';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).put('/0').send({ name: newName });
    }

    it('should return 409 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.CONFLICT);
    });
  });
});
