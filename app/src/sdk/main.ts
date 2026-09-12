import type { Checkout } from "../types/types";
import { createCheckoutIframe } from "./functions/create-checkout-iframe";
import { handleMessage } from "./functions/handle-message";

declare global {
  interface Window {
    DodoPayments: {
      openCheckout: typeof openCheckout;
    };
  }
}

const IS_DEV = true;

const CHECKOUT_ORIGIN = IS_DEV
  ? "http://localhost:5173"
  : "https://dodo-checkout-demo.vercel.app";

let currentCheckout: Checkout | null = null;
let currentIframe: HTMLIFrameElement | null = null;

window.addEventListener("message", (e) => {
  handleMessage(e, CHECKOUT_ORIGIN, currentIframe, currentCheckout);
});

function openCheckout(checkout: Checkout) {
  currentCheckout = checkout;
  currentIframe = createCheckoutIframe(CHECKOUT_ORIGIN, currentCheckout);
}

window.DodoPayments = {
  openCheckout,
};
