import {
  IProfileEventSubscriber,
  ProfileDeleted,
  ProfileEvent,
  ProfileRegistered,
  ProfileRenamed,
} from '../../domain/models';

import type { Kafka } from 'kafkajs';

interface CommonMessage {
  id: string;
}

type RegisteredMessage = CommonMessage & {
  name: string;
  type: 'registered';
};

type DeletedMessage = CommonMessage & {
  type: 'deleted';
};

type RenamedMessage = CommonMessage & {
  newName: string;
  oldName: string;
  type: 'renamed';
};

type Message = RegisteredMessage | DeletedMessage | RenamedMessage;

export class Messenger implements IProfileEventSubscriber<ProfileEvent> {
  private readonly client: Kafka;

  public async handle(event: ProfileEvent): Promise<void> {
    const message = this.createMessageBy(event);

    await this.send(message);
  }

  public async onInit() {
    console.log('Initializing Kafka Messenger...');

    const admin = this.client.admin();

    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes('profiles')) {
      console.log('Creating "profiles" topic...');

      await admin.createTopics({
        topics: [
          {
            topic: 'profiles',
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
    }

    await admin.disconnect();
  }

  private createMessageBy(event: ProfileEvent): Message {
    if (event instanceof ProfileRegistered) {
      return {
        type: 'registered',
        id: event.id.toString(),
        name: event.name.toString(),
      };
    }

    if (event instanceof ProfileDeleted) {
      return {
        type: 'deleted',
        id: event.id.toString(),
      };
    }

    if (event instanceof ProfileRenamed) {
      return {
        type: 'renamed',
        id: event.id.toString(),
        oldName: event.oldName.toString(),
        newName: event.newName.toString(),
      };
    }

    throw new Error();
  }

  private async send(message: Message): Promise<void> {
    const producer = this.client.producer();

    await producer.connect();

    await producer.send({
      topic: 'profiles',
      messages: [
        {
          key: message.type,
          value: JSON.stringify(message),
        },
      ],
    });

    await producer.disconnect();
  }

  public constructor(client: Kafka) {
    this.client = client;
  }
}
