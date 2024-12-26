import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import {
  IProfileEventSubscriber,
  ProfileDeleted,
  ProfileEvent,
  ProfileRegistered,
  ProfileRenamed,
} from '../../domain/models';

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

export class Messenger
  implements
    IProfileEventSubscriber<ProfileEvent>,
    OnModuleInit,
    OnModuleDestroy
{
  private readonly client: ClientKafka;

  public async handle(event: ProfileEvent): Promise<void> {
    const message = this.createMessageBy(event);

    this.send(message);

    return Promise.resolve();
  }

  public async onModuleDestroy() {
    await this.client.close();
  }

  public async onModuleInit() {
    await this.client.connect();
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

  private send(message: Message) {
    return this.client.emit('profiles', message);
  }

  public constructor(client: ClientKafka) {
    this.client = client;
  }
}
