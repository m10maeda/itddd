import { Kafka } from 'kafkajs';

import { ApplicationService } from '../application';
import {
  Profile,
  ProfileEvent,
  ProfileId,
  ProfileName,
} from '../domain/models';
import { ProfileExistenceService } from '../domain/services';
import { ProfileEventBus } from '../infrastructure/event-bus';
import { Messenger } from '../infrastructure/messenger';
import {
  InMemoryProfileFactory,
  InMemoryProfileRepository,
} from '../infrastructure/persistence';

const eventBus = new ProfileEventBus();

const mockProfiles = [
  new Profile(new ProfileId('1'), new ProfileName('Alice')),
  new Profile(new ProfileId('2'), new ProfileName('Bob')),
  new Profile(new ProfileId('3'), new ProfileName('Carol')),
  new Profile(new ProfileId('4'), new ProfileName('Dave')),
  new Profile(new ProfileId('5'), new ProfileName('Ellen')),
  new Profile(new ProfileId('6'), new ProfileName('Frank')),
];

const repository = new InMemoryProfileRepository(mockProfiles);
const factory = new InMemoryProfileFactory(mockProfiles.length);

const existenceService = new ProfileExistenceService(repository);

const kafkaClient = new Kafka({
  brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
  clientId: 'profiles',
});

const messenger = new Messenger(kafkaClient);

eventBus.subscribe(ProfileEvent, messenger);

messenger.onInit().catch((error: unknown) => {
  console.error('Failed to initialize messenger:', error);
});

const service = new ApplicationService(
  eventBus,
  repository,
  factory,
  existenceService,
);

export { service };
