import { saveKey } from "./storage";

export async function saveClientSubscription(subscription: PushSubscription) {
  saveKey("subscription", subscription.toJSON());

  const response = await fetch("https://api.serverless.chat/api/clients", {
    method: "POST",
    body: JSON.stringify(subscription.toJSON()),
  });

  return response.json();
}
