import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Kafka, Partitioners } from 'kafkajs';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafka = new Kafka({
    clientId: 'profiles',
    brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
  });
  const admin = kafka.admin();
  const topics = await admin.listTopics();

  const topicList = [];
  if (!topics.includes('profiles')) {
    topicList.push({
      topic: 'profiles',
      numPartitions: 10,
      replicationFactor: 1,
    });
  }

  if (!topics.includes('profiles.reply')) {
    topicList.push({
      topic: 'profiles.reply',
      numPartitions: 10,
      replicationFactor: 1,
    });
  }

  if (topicList.length) {
    await admin.createTopics({
      topics: topicList,
    });
  }

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
