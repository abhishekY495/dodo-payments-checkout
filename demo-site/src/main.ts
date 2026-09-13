declare const DodoPayments: {
  openCheckout(options: Record<string, unknown>): void;
};

const buyBtn: HTMLButtonElement = document.querySelector("#buy-btn")!;
const dodoPaymentsCheckoutIframeContainer: HTMLDivElement =
  document.querySelector("#dodo-payments-checkout-iframe-container")!;
const dodoPaymentsCheckoutLogsContainer: HTMLDivElement =
  document.querySelector("#dodo-payments-checkout-logs-container")!;
const onCloseMessage: HTMLParagraphElement =
  document.querySelector("#on-close-message")!;
const paymentCompletedMessage: HTMLParagraphElement = document.querySelector(
  "#payment-completed-message",
)!;

function handleOnClose(res: any) {
  console.log(res);
  if (res.reason === "user_closed") {
    onCloseMessage.classList.remove("hidden");
    dodoPaymentsCheckoutIframeContainer.classList.add("hidden");
    dodoPaymentsCheckoutLogsContainer.classList.add("hidden");
    return;
  }

  if (res.reason === "payment_completed") {
    paymentCompletedMessage.classList.remove("hidden");
    dodoPaymentsCheckoutIframeContainer.classList.add("hidden");
    dodoPaymentsCheckoutLogsContainer.classList.add("hidden");
  }
}

buyBtn.addEventListener("click", () => {
  onCloseMessage.classList.add("hidden");
  paymentCompletedMessage.classList.add("hidden");
  dodoPaymentsCheckoutIframeContainer.classList.remove("hidden");
  dodoPaymentsCheckoutLogsContainer.classList.remove("hidden");

  DodoPayments.openCheckout({
    productId: "product_6a51sd",
    elementId: "dodo-payments-checkout-iframe-container",
    logsElementId: "dodo-payments-checkout-logs-container",
    onSuccess: (res: any) => console.log("success", res),
    onClose: (res: any) => handleOnClose(res),
    onDeclined: (res: any) => console.log("error", res),
  });
});
