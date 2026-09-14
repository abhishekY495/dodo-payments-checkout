declare const DodoPayments: {
  openCheckout(options: Record<string, unknown>): void;
};

const productPurchaseContainer: HTMLDivElement = document.querySelector(
  "#product-purchase-container",
)!;
const buyBtn: HTMLButtonElement = document.querySelector("#buy-btn")!;
const dodoPaymentsCheckoutIframeContainer: HTMLDivElement =
  document.querySelector("#dodo-payments-checkout-iframe-container")!;
const onCloseMessage: HTMLParagraphElement =
  document.querySelector("#on-close-message")!;
const paymentCompletedMessage: HTMLParagraphElement = document.querySelector(
  "#payment-completed-message",
)!;
const errorMessageContainer: HTMLDivElement = document.querySelector(
  "#error-message-container",
)!;

function handleOnClose(res: any) {
  console.log(res);
  if (res.reason === "user_closed") {
    onCloseMessage.classList.remove("hidden");
    dodoPaymentsCheckoutIframeContainer.classList.add("hidden");
    productPurchaseContainer.classList.remove("hidden");
    return;
  }

  if (res.reason === "payment_completed") {
    paymentCompletedMessage.classList.remove("hidden");
    dodoPaymentsCheckoutIframeContainer.classList.add("hidden");
    productPurchaseContainer.classList.remove("hidden");
  }
}

function handleError(res: any) {
  console.log(res);
  errorMessageContainer.innerText = res.message;
  dodoPaymentsCheckoutIframeContainer.classList.add("hidden");
  productPurchaseContainer.classList.remove("hidden");
}

buyBtn.addEventListener("click", () => {
  onCloseMessage.classList.add("hidden");
  paymentCompletedMessage.classList.add("hidden");
  errorMessageContainer.innerText = "";
  productPurchaseContainer.classList.add("hidden");
  dodoPaymentsCheckoutIframeContainer.classList.remove("hidden");

  DodoPayments.openCheckout({
    productId: "product_6a51sd",
    elementId: "dodo-payments-checkout-iframe-container",
    logsElementId: "dodo-payments-checkout-logs-container",
    onSuccess: (res: any) => console.log("success", res),
    onClose: (res: any) => handleOnClose(res),
    onDeclined: (res: any) => console.log("declined", res),
    onError: (res: any) => handleError(res),
  });
});
