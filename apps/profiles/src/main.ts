import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Partitioners } from 'kafkajs';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,

    options: {
      client: {
        clientId: 'profiles',
        brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
      },
      consumer: {
        groupId: 'profiles-consumer',
        allowAutoTopicCreation: true,
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.DefaultPartitioner,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Profiles API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error: unknown) => {
  Logger.error(error);
});
