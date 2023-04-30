import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { urlB64ToUint8Array } from "../utils/worker-utils";
// importScripts("../mockServiceWorker.js");
import "../mockServiceWorker.js";
// import { worker } from "../mocks/browser";

declare let self: ServiceWorkerGlobalScope;

// if (process.env.NODE_ENV === "development") {
//   worker
//     .start({
//       serviceWorker: {
//         url: "/dev-sw.js",
//       },
//       onUnhandledRequest: "error",
//     })
//     .then(() => {
//       console.log("started");
//     });
// }

// self.__WB_MANIFEST is default injection point
// precacheAndRoute(self.__WB_MANIFEST);
//
// // clean old assets
// cleanupOutdatedCaches();
//
// // to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));

self.skipWaiting();
clientsClaim();

const applicationServerPublicKey = import.meta.env.VITE_APP_PUBLIC_PUSH_KEY;

self.addEventListener("push", function (event) {
  console.info("[Service Worker] Push Message Received.");
  console.log(`[Service Worker] Push had this data: "${event.data?.text()}"`);
  console.log("[Service Worker]", event.data?.json());
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  // @ts-ignore
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (newSubscription) {
        // TODO: Send to application server
        console.log("[Service Worker] New subscription: ", newSubscription);
      }),
  );
});
