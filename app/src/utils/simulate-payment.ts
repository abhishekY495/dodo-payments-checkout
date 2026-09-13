import type { PaymentResult } from "../types/types";
import { DECLINE_CARD, RETRY_CARD } from "./constants";
import { delay } from "./delay";

const attemptCounts = new Map<string, number>();

export async function simulatePayment(
  cardNumber: string,
): Promise<PaymentResult> {
  await delay(1200);

  let attempts = attemptCounts.get(cardNumber);
  if (attempts === undefined) {
    attempts = 0;
  }

  attempts = attempts + 1;
  attemptCounts.set(cardNumber, attempts);

  if (cardNumber === DECLINE_CARD) {
    return {
      status: "declined",
      code: "card_declined",
      message: "Your card was declined.",
    };
  }

  if (cardNumber === RETRY_CARD && attempts === 1) {
    return {
      status: "declined",
      code: "processing_error",
      message: "Something went wrong. Please try again.",
    };
  }

  return { status: "success", orderId: `dodo_${crypto.randomUUID()}` };
}
