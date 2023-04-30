import { saveClientSubscription } from "../services/client";

export function urlB64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export async function subscribeUser(swRegistration: ServiceWorkerRegistration) {
  const applicationServerPublicKey = import.meta.env.VITE_APP_PUBLIC_PUSH_KEY;
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  try {
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
    console.log("User is subscribed.");
    return saveClientSubscription(subscription);
  } catch (error) {
    console.error("Failed to subscribe the user: ", error);
  }
}
