import type { Checkout } from "../../types/types";

export function createCheckoutIframe(
  checkoutOrigin: string,
  checkout: Checkout,
) {
  const parentOrigin = window.location.origin;
  const iframe = document.createElement("iframe");

  const params = new URLSearchParams({
    productId: checkout.productId,
    parentOrigin,
  });

  iframe.src = `${checkoutOrigin}?${params}`;
  iframe.style.cssText = `width: 100%; height: 100%;`;

  const checkoutElement = document.getElementById(checkout.elementId);
  if (checkoutElement) {
    checkoutElement.appendChild(iframe);
  }

  return iframe;
}
