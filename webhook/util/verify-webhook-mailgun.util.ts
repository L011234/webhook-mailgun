import * as crypto from "crypto";
import { IMailgunWebhookSignature } from "../interface/mailgun-webhook-signature.interface";

export const verifyMailgunWebhook = ({
  signingKey,
  timestamp,
  token,
  signature,
}: IMailgunWebhookSignature): boolean => {
  const encodedToken = crypto
    .createHmac("sha256", signingKey)
    .update(timestamp.concat(token))
    .digest("hex");

  return encodedToken === signature;
};
