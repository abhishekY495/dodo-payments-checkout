import type { Checkout } from "../../types/types";

export function createCheckoutIframe(
  checkoutOrigin: string,
  checkout: Checkout,
) {
  const parentOrigin = window.location.origin;
  const iframe = document.createElement("iframe");

  iframe.src = `${checkoutOrigin}?productId=${checkout.productId}&parentOrigin=${parentOrigin}`;
  iframe.style.cssText = `width: 100%; height: 100%;`;

  const checkoutElement = document.getElementById(checkout.elementId);
  if (checkoutElement) {
    checkoutElement.appendChild(iframe);
  }

  return iframe;
}
