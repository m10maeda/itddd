import { createMock } from '@golevelup/ts-jest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { Profile, ProfileId, ProfileName } from '../src/domain/models';
import { PROFILE_REPOSITORY } from '../src/infrastructure/infrastructure.module';
import { Messenger } from '../src/infrastructure/messenger';
import { MESSENGER } from '../src/infrastructure/messenger/messenger.module';
import { InMemoryProfileRepository } from '../src/infrastructure/persistence';

describe('Get profile use case', () => {
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
      .overrideProvider(MESSENGER)
      .useValue(createMock<Messenger>())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when profile with specified id exist', () => {
    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).get('/1');
    }

    it('should return 200 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.OK);
    });

    it('should return saved profile with specified', async () => {
      const result = await act();

      expect(result.body).toEqual({ id: '1', name: 'Bob' });
    });
  });

  describe('when profile with specified id does not exist', () => {
    it('should return 404 HTTP status code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/unknown');

      expect(result.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
