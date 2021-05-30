export interface IMailgunWebhookSignature {
  timestamp: string;
  token: string;
  signature: string;
  signingKey: string;
}
