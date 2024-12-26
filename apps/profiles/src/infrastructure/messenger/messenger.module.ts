import { Module, Provider } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

import { Messenger } from './messenger';
import { ProfileEvent } from '../../domain/models';
import { ProfileEventBus } from '../event-bus';
import { EventBusModule } from '../event-bus/event-bus.module';

export const MESSENGER = Symbol('MESSENGER');

export const MESSENGER_CLIENT = Symbol('MESSENGER_CLIENT');

@Module({
  imports: [
    EventBusModule,
    ClientsModule.register([
      {
        name: MESSENGER_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'profiles',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'profiles-consumer',
            allowAutoTopicCreation: true,
          },
          producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],

  providers: [
    {
      provide: MESSENGER,
      useFactory: (bus: ProfileEventBus, client: ClientKafka) => {
        const messenger = new Messenger(client);

        bus.subscribe(ProfileEvent, messenger);

        return messenger;
      },
      inject: [ProfileEventBus, MESSENGER_CLIENT],
    } satisfies Provider<Messenger>,
  ],

  exports: [MESSENGER],
})
export class MessengerModule {}
