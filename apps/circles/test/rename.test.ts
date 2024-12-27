import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { createTestingModule } from './fixtures';

describe('Rename circle use case', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await createTestingModule().compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when circle with specified name does not exist', () => {
    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer())
        .put('/0')
        .send({ name: 'Basketball' });
    }

    it('should return 204 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('should rename circle', async () => {
      await act();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/0');

      expect(result.body).toEqual(
        expect.objectContaining({
          name: 'Basketball',
        }),
      );
    });
  });

  describe('when circle with specified name exist', () => {
    it('should return 409 HTTP status code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer())
        .put('/0')
        .send({ name: 'Football' });

      expect(result.status).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('when rename last name', () => {
    it('should return 204 HTTP status code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await request(app.getHttpServer()).put('/0').send({ name: 'Basketball' });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer())
        .put('/0')
        .send({ name: 'Baseball' });

      expect(result.status).toBe(HttpStatus.NO_CONTENT);
    });
  });
});
