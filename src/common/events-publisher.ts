import { Logger } from "@nestjs/common";
import { ChannelModel, ConfirmChannel, connect } from "amqplib";
import { CRM_EVENTS_EXCHANGE } from "../contracts";
import type { CrmEventName, CrmEvents } from "../contracts";

export class EventsPublisher {
  private connection?: ChannelModel;
  private channel?: ConfirmChannel;
  private readonly logger = new Logger("EventsPublisher");

  constructor(private readonly url: string) {}

  async connect(): Promise<void> {
    if (this.channel) {
      return;
    }

    this.connection = await connect(this.url);
    this.channel = await this.connection.createConfirmChannel();

    await this.channel.assertExchange(CRM_EVENTS_EXCHANGE, "topic", {
      durable: true,
    });

    this.logger.log("Connected, exchange crm.events ready");
  }

  async publish<K extends CrmEventName>(
    event: K,
    data: CrmEvents[K],
  ): Promise<void> {
    if (!this.channel) {
      throw new Error(
        "EventsPublisher is not connected. Call connect() before publishing events.",
      );
    }
    const body = Buffer.from(JSON.stringify({ pattern: event, data }));

    this.channel.publish(CRM_EVENTS_EXCHANGE, event, body, {
      persistent: true,
      contentType: "application/json",
    });
    await this.channel.waitForConfirms();
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}
