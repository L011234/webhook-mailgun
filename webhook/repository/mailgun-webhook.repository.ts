import { connect } from "../config/db.config";
import { MailGunWebhookModel } from "../model/mailgun-webhook.model";
import { APILogger } from "../logger/api.logger";
import { IMailgunWebhook } from "../interface/mailgun-webhook.interface";

export class MailgunWebhookRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async create(task: IMailgunWebhook): Promise<any> {
    let data = {};
    try {
      data = await MailGunWebhookModel.create(task);
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }
}
