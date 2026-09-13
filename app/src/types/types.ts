export type Checkout = {
  productId: string;
  elementId: string;
  logsElementId: string;
  onSuccess: (data: { sessionId: string }) => void;
  onClose: (data: { reason: "user" }) => void;
  onDeclined: (data: { code: string; message: string }) => void;
};

export type PaymentState = "idle" | "processing" | "success" | "declined";

export type PaymentResult =
  | { status: "success"; sessionId: string }
  | { status: "declined"; code: string; message: string };
