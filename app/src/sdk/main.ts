import type { Checkout } from "../types/types";
import { CHECKOUT_LOAD_TIMEOUT } from "../utils/constants";
import { createCheckoutIframe } from "./functions/create-checkout-iframe";
import { handleMessage } from "./functions/handle-message";

declare global {
  interface Window {
    DodoPayments: {
      openCheckout: typeof openCheckout;
    };
  }
}

const IS_DEV = false;

const CHECKOUT_ORIGIN = IS_DEV
  ? "http://localhost:5173"
  : "https://app-seven-zeta-6ckoa86wu0.vercel.app";

let currentCheckout: Checkout | null = null;
let currentIframe: HTMLIFrameElement | null = null;
let checkoutLoadTimeout: ReturnType<typeof setTimeout> | null = null;

function clearCheckoutLoadTimeout() {
  if (checkoutLoadTimeout) {
    clearTimeout(checkoutLoadTimeout);
    checkoutLoadTimeout = null;
  }
}

function openCheckout(checkout: Checkout) {
  if (currentIframe) {
    return;
  }

  currentCheckout = checkout;
  currentIframe = createCheckoutIframe(CHECKOUT_ORIGIN, currentCheckout);

  checkoutLoadTimeout = setTimeout(() => {
    if (!currentIframe) return;

    currentCheckout?.onError?.({
      code: "checkout_load_failed",
      message: "Checkout failed to load. Please try again.",
    });

    currentIframe.remove();

    currentIframe = null;
    currentCheckout = null;
    checkoutLoadTimeout = null;
  }, CHECKOUT_LOAD_TIMEOUT);
}

function removeCheckout() {
  clearCheckoutLoadTimeout();
  currentIframe?.remove();
  currentIframe = null;
  currentCheckout = null;
}

window.addEventListener("message", (e) => {
  handleMessage(
    e,
    CHECKOUT_ORIGIN,
    currentIframe,
    currentCheckout,
    clearCheckoutLoadTimeout,
    removeCheckout,
  );
});

window.DodoPayments = {
  openCheckout,
};
