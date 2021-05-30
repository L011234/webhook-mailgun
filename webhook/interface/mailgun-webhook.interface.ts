export interface IMailgunWebhook {
  signature: string | null;
  event_data: string | null;
  createDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
}
