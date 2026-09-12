import type { Checkout } from "../../types/types";

export function createCheckoutIframe(
  checkoutOrigin: string,
  checkout: Checkout,
) {
  const parentOrigin = window.location.origin;
  const iframe = document.createElement("iframe");

  iframe.src = `${checkoutOrigin}?productId=${checkout.productId}&parentOrigin=${encodeURIComponent(parentOrigin)}`;
  iframe.style.cssText = "border: 1px solid black;";

  document.body.appendChild(iframe);

  return iframe;
}
