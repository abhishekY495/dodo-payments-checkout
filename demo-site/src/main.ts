const buyBtn = document.querySelector("#buy-btn");

declare const DodoPayments: {
  openCheckout(options: Record<string, unknown>): void;
};

buyBtn?.addEventListener("click", () => {
  DodoPayments.openCheckout({
    productId: "product_6a51sd",
    elementId: "dodo-payments-checkout-iframe",
    logsElementId: "dodo-payments-checkout-logs",
    onSuccess: (res: any) => console.log("success", res),
    onClose: (res: any) => console.log("closed", res),
    onError: (res: any) => console.log("error", res),
  });
});
