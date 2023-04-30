// @ts-ignore
import { useRegisterSW } from "virtual:pwa-register/react";
import { saveClientSubscription } from "../services/client";
import { subscribeUser } from "../utils/worker-utils";
import { worker } from "../mocks/browser";

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = "__DATE__";
  // replaced dynamically
  const reloadSW = "__RELOAD_SW__";

  // @ts-ignore
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    async onRegistered(r: ServiceWorkerRegistration) {
      if (process.env.NODE_ENV === "development" && r.active?.scriptURL) {
        console.log(r.active?.scriptURL);
        worker.printHandlers();
        return worker.start({
          serviceWorker: {
            url: r.active?.scriptURL,
          },
        });
      }

      if ("PushManager" in window && r.active) {
        console.log("Push is supported");
        console.log("Service Worker is registered", r);
        const subscription = await r.pushManager.getSubscription();
        if (subscription) {
          console.info("Subscription is here");
          await saveClientSubscription(subscription);
        } else {
          console.warn("No subscription");
          await subscribeUser(r);
        }
      }
      // @ts-expect-error just ignore
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            // eslint-disable-next-line no-console
            console.log("Checking for sw update");
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        // eslint-disable-next-line prefer-template,no-console
        console.log("SW Registered: " + r);
      }
    },
    onRegisterError(error: Error) {
      // eslint-disable-next-line no-console
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="p-0 m-0 w-0 h-0">
      {(offlineReady || needRefresh) && (
        <div className="fixed right-0 bottom-o m-4 p-3 bg-white z-10 border border-solid border-zinc-50 rounded shadow-md shadow-zinc-50 text-left">
          <div className="mb-2">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className="border border-solid border-zinc-50 rounded outline-none rounded px-2 py-3 mr-3"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>
            Close
          </button>
        </div>
      )}
      <div className="invisible">{buildDate}</div>
    </div>
  );
}

export default ReloadPrompt;
