# sam-app-with-function

## How to setup?

1. Go to webhook directory by terminal and run `npm install`
2. Go to template.yml file and edit the environment variables (if you want to run in local)
    1. WEBHOOK_VERIFICATION_KEY: 'key from mailgun webhook dashboard'
    2. DB_CONNECTION_STRING: 'mongodb string uri; You can create mongo atlas free tier'
    3. ACCESS_KEY_ID: 'access key'
    4. SECRET_ACCESS_KEY: 'secret key'
    5. REGION: 'region try to make sure, you have same region for API gateway, Lambda funtion, SNS topic'
    6. TOPIC_ARN: 'SNS Topic ARN'
3. Run command `npm run start-api` , this will compile ts to built diectory, and run the project
4. If you want to run code in aws, zip the built folder inside webhook, and upload via s3 bucket.
5. If you are running in AWS, make sure you have declared the required environment variables. And please make sure the gateway api    response timeout is 30ms atleast, Reason for this is i was using mongo atlas free tier, so it takes time to connect to db.


### Note: 
1. Make sure to declare the environment variables
2. Make sure to give permissions to created user via IAM (Like -> SNS, Lambda, etc.)
3. Current architecture of project is created by keep in mind that, we have only one function. So, i used pattern in one function directory itself.

### Further optimization
Yes it can be further optimized in case of size, If we can use layers concept, So everything but lambda handler will be moved to layer. This way lambda function size can come in kbs instead of Mbs.
I can explain this later.

### Better approach to deploy ?
  Yes, use of cloudformation template to provide everything, like security, permissions, vpc etc. via cft