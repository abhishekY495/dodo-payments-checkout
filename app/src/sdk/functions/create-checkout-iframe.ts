import type { Checkout } from "../../types/types";

export function createCheckoutIframe(
  checkoutOrigin: string,
  checkout: Checkout,
) {
  const parentOrigin = window.location.origin;
  const iframe = document.createElement("iframe");
  const checkoutElement = document.getElementById(checkout.elementId);

  const params = new URLSearchParams({
    productId: checkout.productId,
    parentOrigin,
  });

  iframe.src = `${checkoutOrigin}?${params}`;
  iframe.style.cssText = `width: 100%; height: 100%; display: none;`;

  if (checkoutElement) {
    checkoutElement.innerHTML = `
      <div class="checkout-spinner" style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      ">
        <div style="
        width: 32px;
        height: 32px;
        border: 3px solid #ddd;
        border-top-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        animation: checkout-spin 0.8s linear infinite;
        "></div>
      </div>
      <style>
        @keyframes checkout-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    checkoutElement.appendChild(iframe);
  } else {
    document.body.append(iframe);
  }

  iframe.addEventListener("load", () => {
    const spinner = checkoutElement?.querySelector(".checkout-spinner");
    spinner?.remove();
    iframe.style.display = "block";
  });

  return iframe;
}
