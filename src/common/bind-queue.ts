import { connect, type Channel, type ChannelModel } from "amqplib";
import {
  CRM_EVENTS_EXCHANGE,
  type CrmEventName,
  type CrmEventPattern,
} from "../contracts";

export async function bindQueueToEvents(options: {
  url: string;
  queue: string;
  events: (CrmEventName | CrmEventPattern)[];
}): Promise<void> {
  let connection: ChannelModel | undefined;
  let channel: Channel | undefined;

  try {
    connection = await connect(options.url);
    channel = await connection.createChannel();

    await channel.assertExchange(CRM_EVENTS_EXCHANGE, "topic", {
      durable: true,
    });
    await channel.assertQueue(options.queue, { durable: true });

    for (const key of options.events) {
      await channel.bindQueue(options.queue, CRM_EVENTS_EXCHANGE, key);
    }
  } finally {
    await channel?.close();
    await connection?.close();
  }
}
