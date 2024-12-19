import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { createTestingModule } from './fixtures';

describe('Register circle use case', () => {
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
        .post('/')
        .send({ name: 'Basketball', owner: '1' });
    }

    it('should return 201 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.CREATED);
    });

    it('should return location with registered resource in response header', async () => {
      const result = await act();

      expect(result.headers).toHaveProperty('location', '/2');
    });

    it('should add registered circle', async () => {
      await act();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/2');

      expect(result.body).toEqual({
        id: '2',
        name: 'Basketball',
        owner: '1',
        members: [],
      });
    });
  });

  describe('when circle with specified name exist', () => {
    it('should return 409 HTTP status code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer())
        .post('/')
        .send({ name: 'Baseball', owner: '1' });

      expect(result.status).toBe(HttpStatus.CONFLICT);
    });
  });
});
