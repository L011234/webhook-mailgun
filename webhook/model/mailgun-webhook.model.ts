import { model, Schema, Model, Document } from "mongoose";

interface IMailgunWebhook extends Document {
  signature: string;
  event_data: string;
  createDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
}
const MailGunWebhookSchema: Schema = new Schema({
  signature: { type: String, required: true },
  event_data: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: false },
  updatedBy: { type: String, required: false },
});

export const MailGunWebhookModel: Model<IMailgunWebhook> =
  model<IMailgunWebhook>("mailgun_webhook", MailGunWebhookSchema);
