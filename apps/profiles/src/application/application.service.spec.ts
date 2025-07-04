import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedObject,
} from 'vitest';

import { ApplicationService } from './application.service';
import { ProfileData } from './dto';
import { ProfileNotFoundException } from './exceptions';
import {
  IProfileEventPublisher,
  IProfileFactory,
  IProfileRepository,
  Profile,
  ProfileId,
  ProfileName,
} from '../domain/models';
import { ProfileExistenceService } from '../domain/services';

describe('ApplicationService', () => {
  const mockEventPublisher = {
    publish: vi.fn(),
  } as unknown as MockedObject<IProfileEventPublisher>;
  const mockProfileFactory = {
    create: vi.fn(),
  } as unknown as MockedObject<IProfileFactory>;
  const mockProfileRepository = {
    getBy: vi.fn(),
    getAll: vi.fn(),
    delete: vi.fn(),
    save: vi.fn(),
  } as unknown as MockedObject<IProfileRepository>;
  const mockProfileExistenceService = {
    exists: vi.fn(),
  } as unknown as MockedObject<ProfileExistenceService>;

  function createApplicationService() {
    return new ApplicationService(
      mockEventPublisher,
      mockProfileRepository,
      mockProfileFactory,
      mockProfileExistenceService,
    );
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('delete method', () => {
    describe('when profile with specified id exist', () => {
      beforeEach(() => {
        mockProfileRepository.getBy.mockResolvedValueOnce(
          new Profile(new ProfileId('DUMMY_ID'), new ProfileName('Alice')),
        );
      });

      it('should resolve', async () => {
        const sut = createApplicationService();

        await expect(sut.delete('DUMMY_ID')).resolves.not.toThrow();
      });

      it('should call publish in event publisher', async () => {
        const sut = createApplicationService();

        await sut.delete('DUMMY_ID');

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockEventPublisher.publish).toHaveBeenCalledOnce();
      });
    });

    describe('when no profile with specified id', () => {
      beforeEach(() => {
        mockProfileRepository.getBy.mockResolvedValueOnce(undefined);
      });

      it('should reject', async () => {
        const sut = createApplicationService();

        await expect(sut.delete('DUMMY_ID')).rejects.toThrow();
      });

      it('should throw ProfileNotFoundException', async () => {
        const sut = createApplicationService();

        await expect(sut.delete('DUMMY_ID')).rejects.toThrow(
          ProfileNotFoundException,
        );
      });

      it('should not call publish in event publisher', async () => {
        const sut = createApplicationService();

        try {
          await sut.delete('DUMMY_ID');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // ignore error
        } finally {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          expect(mockEventPublisher.publish).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('findAll method', () => {
    describe('when repository return some profiles', () => {
      beforeEach(() => {
        mockProfileRepository.getAll.mockResolvedValueOnce([
          new Profile(new ProfileId('DUMMY_ID_1'), new ProfileName('Alice')),
          new Profile(new ProfileId('DUMMY_ID_2'), new ProfileName('Bob')),
        ]);
      });

      it('should return some profile data', async () => {
        const sut = createApplicationService();

        const result = await sut.getAll();

        expect(result).toEqual([
          new ProfileData('DUMMY_ID_1', 'Alice'),
          new ProfileData('DUMMY_ID_2', 'Bob'),
        ]);
      });
    });
  });

  describe('getBy method', () => {
    describe('when repository return a profile with specified id', () => {
      beforeEach(() => {
        mockProfileRepository.getBy.mockResolvedValueOnce(
          new Profile(new ProfileId('DUMMY_ID'), new ProfileName('Alice')),
        );
      });

      it('should return a profile data', async () => {
        const sut = createApplicationService();

        const result = await sut.getBy('DUMMY_ID');

        expect(result).toEqual(new ProfileData('DUMMY_ID', 'Alice'));
      });
    });

    describe('when repository dose not return a profile with specified id', () => {
      beforeEach(() => {
        mockProfileRepository.getBy.mockResolvedValueOnce(undefined);
      });

      it('should reject', async () => {
        const sut = createApplicationService();

        await expect(sut.getBy('DUMMY_ID')).rejects.toThrow();
      });

      it('should throw ProfileNotFoundException', async () => {
        const sut = createApplicationService();

        await expect(sut.getBy('DUMMY_ID')).rejects.toThrow(
          ProfileNotFoundException,
        );
      });
    });
  });

  describe('register method', () => {
    describe('when no specified name exist', () => {
      beforeEach(() => {
        mockProfileExistenceService.exists.mockResolvedValueOnce(false);
        mockProfileFactory.create.mockResolvedValue(
          new Profile(new ProfileId('NEW_ID'), new ProfileName('Alice')),
        );
      });

      it('should call publish in event publisher', async () => {
        const sut = createApplicationService();

        await sut.register('Alice');

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockEventPublisher.publish).toHaveBeenCalledOnce();
      });

      it('should return id that created by factory', async () => {
        mockProfileFactory.create.mockResolvedValueOnce(
          new Profile(new ProfileId('NEW_ID'), new ProfileName('Alice')),
        );

        const sut = createApplicationService();

        const result = await sut.register('Alice');

        expect(result).toBe('NEW_ID');
      });
    });

    describe('when specified name exist', () => {
      beforeEach(() => {
        mockProfileExistenceService.exists.mockResolvedValueOnce(true);
      });

      it('should reject', async () => {
        const sut = createApplicationService();

        await expect(sut.register('Alice')).rejects.toThrow();
      });
    });
  });

  describe('rename method', () => {
    describe('when repository return a profile with specified id', () => {
      describe('when no specified name exist', () => {
        beforeEach(() => {
          mockProfileExistenceService.exists.mockResolvedValueOnce(false);
          mockProfileRepository.getBy.mockResolvedValueOnce(
            new Profile(new ProfileId('DUMMY_ID'), new ProfileName('Alice')),
          );
        });

        it('should call publish in event publisher', async () => {
          const sut = createApplicationService();

          await sut.rename('DUMMY_ID', 'Alice');

          // eslint-disable-next-line @typescript-eslint/unbound-method
          expect(mockEventPublisher.publish).toHaveBeenCalledOnce();
        });
      });

      describe('when specified name exist', () => {
        beforeEach(() => {
          mockProfileExistenceService.exists.mockResolvedValueOnce(true);
        });

        it('should reject', async () => {
          const sut = createApplicationService();

          await expect(sut.rename('DUMMY_ID', 'Alice')).rejects.toThrow();
        });
      });
    });

    describe('when repository dose not return a profile with specified id', () => {
      beforeEach(() => {
        mockProfileRepository.getBy.mockResolvedValueOnce(undefined);
      });

      it('should reject', async () => {
        const sut = createApplicationService();

        await expect(sut.rename('DUMMY_ID', 'Bob')).rejects.toThrow();
      });

      it('should throw ProfileNotFoundException', async () => {
        const sut = createApplicationService();

        await expect(sut.rename('DUMMY_ID', 'Bob')).rejects.toThrow(
          ProfileNotFoundException,
        );
      });
    });
  });
});
