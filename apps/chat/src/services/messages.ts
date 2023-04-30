import type { Message } from "../components/Message";
export async function retrieveMessages() {
  const response = await fetch("https://api.serverless.chat/api/messages");

  return response.json();
}

export async function sendMessages(message: Message) {
  const response = await fetch("https://api.serverless.chat/api/message", {
    method: "POST",
    body: JSON.stringify(message),
  });

  return response.json();
}
