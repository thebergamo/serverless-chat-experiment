const applicationServerPublicKey =
  "BKMz5wcHnVhCSwHOTUNecisZey0b3D_BoYGr6gIjeUMI9LH1HCD4GIFy5zjH-jvH1R3zTP6KTj6Q5laZNtS-Qsg";

function urlB64ToUint8Array(base64String: string) {
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

self.addEventListener("push", function (event) {
  console.info("[Service Worker] Push Message Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  console.log("[Service Worker]", event.data.json());
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (newSubscription) {
        // TODO: Send to application server
        console.log("[Service Worker] New subscription: ", newSubscription);
      })
  );
});
