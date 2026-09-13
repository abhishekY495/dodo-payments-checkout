export type Checkout = {
  productId: string;
  elementId: string;
  logsElementId: string;
  onSuccess: (data: { sessionId: string }) => void;
  onClose: (data: { reason: "user" }) => void;
  onError: (data: { code: string; message: string }) => void;
};

export type CheckoutMessage =
  | {
      type: "CHECKOUT_READY";
    }
  | {
      type: "CHECKOUT_SUCCESS";
      sessionId: string;
    }
  | {
      type: "CHECKOUT_ERROR";
      code: string;
      message: string;
    }
  | {
      type: "CHECKOUT_CLOSE";
      reason: "user";
    };
