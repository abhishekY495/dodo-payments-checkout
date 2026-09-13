import type { Checkout } from "../types/types";

export const removeCheckout = (
  currentIframe: HTMLIFrameElement | null,
  currentCheckout: Checkout | null,
) => {
  currentIframe?.remove();
  currentIframe = null;
  currentCheckout = null;
};
