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
      .overrideProvider(MESSENGER)
      .useValue(createMock<Messenger>())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when profile can be deleted', () => {
    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).delete('/0');
    }

    it('should return 204 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('should delete profile the specified id', async () => {
      await act();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await request(app.getHttpServer()).get('/0');

      expect(result.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('when profile with the specified id does not not existed', () => {
    async function act() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return request(app.getHttpServer()).delete('/unknown');
    }

    it('should return 404 HTTP status code', async () => {
      const result = await act();

      expect(result.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
