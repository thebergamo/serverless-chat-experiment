import PushWorker from "../worker/push?worker";

export const useWorker = () => {
  const pushWorker = new PushWorker();

  navigator.serviceWorker.register(pushWorker).then((reg) => {
    console.log(reg);
  });

  return { pushWorker };
};
