export type Checkout = {
  productId: string;
  elementId: string;
  logsElementId: string;
  onSuccess: (data: { orderId: string }) => void;
  onClose: (data: { reason: "user_closed" | "payment_completed" }) => void;
  onDeclined: (data: { code: string; message: string }) => void;
};

export type PaymentState = "idle" | "processing" | "success" | "declined";

export type PaymentResult =
  | { status: "success"; orderId: string }
  | { status: "declined"; code: string; message: string };
