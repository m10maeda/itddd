import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { createTestingModule } from './fixtures';

describe('Get circle use case', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await createTestingModule().compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when circle with specified id exist', () => {
    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).get('/0');
    }

    it('should return 200 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.OK);
    });

    it('should return saved profile with specified', async () => {
      const result = await act();

      expect(result.body).toEqual({
        id: '0',
        name: 'Baseball',
        owner: '0',
        members: ['1', '3'],
      });
    });
  });

  describe('when circle with specified id does not exist', () => {
    it('should return 404 HTTP status code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/unknown');

      expect(result.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
