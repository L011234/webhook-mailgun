import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { APILogger } from "./logger/api.logger";
import { MailgunWebhookService } from "./service/mailgun-webhook.service";
import { verifyMailgunWebhook } from "./util/verify-webhook-mailgun.util";
import { sendSNS } from "./util/send-sns.util";

let response;

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const requestBody = event.body ?? JSON.stringify({});
    const requestBodyParsed = JSON.parse(requestBody);
    const signature = requestBodyParsed.signature;
    const event_data = requestBodyParsed["event-data"];
    // Verify the signature
    const verificationResults = verifyMailgunWebhook({
      ...signature,
      signingKey: process.env.WEBHOOK_VERIFICATION_KEY,
    });
    if (verificationResults) {
      // Send data to SNS
      const snsObject = {
        Provider: "Mailgun",
        timestamp: event_data.timestamp,
        type: event_data.event,
      };
      await sendSNS(JSON.stringify(snsObject));
      // Save data to db
      const webhookData = {
        signature: JSON.stringify(signature),
        event_data: JSON.stringify(event_data),
        createDate: new Date().toDateString(),
        updatedDate: new Date().toDateString(),
        createdBy: "",
        updatedBy: "",
      };
      const logger = new APILogger();
      logger.info("Controller: createTask", webhookData);
      const mailgunWebhookService = new MailgunWebhookService();

      await mailgunWebhookService.create(webhookData);
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "success",
        }),
      };
    } else {
      response = {
        statusCode: 403,
        body: JSON.stringify({
          message: "Verification failed",
        }),
      };
    }
  } catch (err) {
    console.log(JSON.stringify(err), err.message);
    return err;
  }

  return response;
};
