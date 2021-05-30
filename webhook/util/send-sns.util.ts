import * as AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
export const sendSNS = async (message: string): Promise<void> => {
  // Configure AWS
  const params = {
    Message: message /* required */,
    TopicArn: process.env.TOPIC_ARN,
  };

  // Create promise and SNS service object
  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
  const data = await publishTextPromise.catch(function (err) {
    console.error(err, err.stack);
  });
  if (data) {
    console.log(
      `Message ${params.Message} sent to the topic ${params.TopicArn}`
    );
    console.log("MessageID is " + data.MessageId);
  }
};
