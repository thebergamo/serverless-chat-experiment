# serverless-chat-experiment
Simple chat using serverless stack without websockets

## Objective
The goal of this project is to provide some simple app that is able to run a chat application using only serverless components.

Without the need to keep a websocket server and connect to many clients at the same time, but rather using Push notifications instead.

> 🚧 ⚠️ This is meant to be a study on the topic and explore some possiblities.

## Architecture

![Architecture](docs/architecture.svg#gh-light-mode-only)
![Architecture](docs/architecture_dark.svg#gh-dark-mode-only)

In order to use as much as we can of the Serverless components (in this case, I'm using AWS as my reference) we can spot the following services:
* Amazon API Gateway - It will be our main orchestrator to connect our lambdas and provide entry point for our Web APP
* AWS Lambda - In order to keep us cost effective, using AWS Lambdas and paying only when we really need it is essential
* DynamoDB Tables - DynamoDB give us the ability to "stream" the changes so we don't need to keep pulling new messages, but notify when a message is received.
* AWS SQS - Once a new message is streamed we can use SQS to queue our messages and invoke a lambda to dispatch it to corresponded Browser Push server.

### Sequence of Work

1. Web App Register Client (Register Client Lambda)
2. Register Client Lambda stores information in the Client's table
3. Web App Retrieve previous messages (Retrieve Messages Lambda)
4. Retrieve Messages Lambda send a query to Chat Messages' table
5. Result of query is returned to Retrieve Messages Lambda
6. Response is returned to API Gateway and subsequently to Web App
7. Web App send new message (Store Message Lambda)
8. Store Message Lambda save new message in the Chat Messages' table
9. Chat Messages' table dispatch this change to Message Update stream
10. Message Update stream push this new change into New Message Queue
11. Queue invoke Notifier Lambda
12. Notifier Lambda retrieve clients to notify from Client's table
13. Client's table return result of query
14. Notifier Lambda send web push to Browser Push Server
15. Browser Push server notify web app
FIN.