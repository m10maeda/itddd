import { ProfileData } from './dto';
import {
  CanNotRegisterProfileException,
  CanNotRenameProfileException,
  ProfileNotFoundException,
} from './exceptions';
import {
  type IProfileEventPublisher,
  type IProfileFactory,
  type IProfileRepository,
  ProfileId,
  ProfileName,
  ProfileRegistered,
  ProfileDeleted,
} from '../domain/models';
import { ProfileExistenceService } from '../domain/services';

export class ApplicationService {
  public readonly eventPublisher: IProfileEventPublisher;

  public readonly factory: IProfileFactory;

  public readonly repository: IProfileRepository;

  public readonly service: ProfileExistenceService;

  public async delete(id: string): Promise<void> {
    const profile = await this.repository.getBy(new ProfileId(id));

    if (profile === undefined) throw new ProfileNotFoundException();

    const event = new ProfileDeleted(profile.id);

    await this.repository.delete(profile);

    await this.eventPublisher.publish(event);
  }

  public async findAllBy(
    ids: Iterable<string>,
  ): Promise<Iterable<ProfileData>> {
    return (
      await Promise.all(
        Array.from(ids).map(async (id) => {
          try {
            return await this.getBy(id);
          } catch (error) {
            if (error instanceof ProfileNotFoundException) return undefined;

            throw error;
          }
        }),
      )
    ).filter((profile) => profile !== undefined);
  }

  public async getAll(): Promise<Iterable<ProfileData>> {
    const profiles = await this.repository.getAll();

    return Array.from(profiles).map(
      (profile) =>
        new ProfileData(profile.id.toString(), profile.name.toString()),
    );
  }

  public async getBy(id: string): Promise<ProfileData> {
    const profile = await this.repository.getBy(new ProfileId(id));

    if (profile === undefined) throw new ProfileNotFoundException();

    return new ProfileData(profile.id.toString(), profile.name.toString());
  }

  public async register(name: string): Promise<string> {
    const profile = await this.factory.create(new ProfileName(name));

    if (await this.service.exists(profile))
      throw new CanNotRegisterProfileException();

    await this.repository.save(profile);

    const event = new ProfileRegistered(profile.id, profile.name);
    await this.eventPublisher.publish(event);

    return profile.id.toString();
  }

  public async rename(id: string, name: string): Promise<void> {
    const profile = await this.repository.getBy(new ProfileId(id));

    if (profile === undefined) throw new ProfileNotFoundException();

    const newName = new ProfileName(name);

    const event = profile.renameTo(newName);

    if (await this.service.exists(profile))
      throw new CanNotRenameProfileException();

    await this.repository.save(profile);

    await this.eventPublisher.publish(event);
  }

  public constructor(
    eventPublisher: IProfileEventPublisher,
    repository: IProfileRepository,
    factory: IProfileFactory,
    service: ProfileExistenceService,
  ) {
    this.eventPublisher = eventPublisher;
    this.repository = repository;
    this.factory = factory;
    this.service = service;
  }
}
