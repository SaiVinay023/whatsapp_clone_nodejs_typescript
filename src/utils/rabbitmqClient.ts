import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertQueue('messages');
}

export { channel };
