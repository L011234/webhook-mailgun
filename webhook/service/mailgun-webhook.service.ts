import { MailgunWebhookRepository } from "../repository/mailgun-webhook.repository";
import { IMailgunWebhook } from "../interface/mailgun-webhook.interface";

export class MailgunWebhookService {
  private mailgunWebhookRepository: MailgunWebhookRepository;

  constructor() {
    this.mailgunWebhookRepository = new MailgunWebhookRepository();
  }

  async create(task: IMailgunWebhook): Promise<any> {
    return await this.mailgunWebhookRepository.create(task);
  }
}
