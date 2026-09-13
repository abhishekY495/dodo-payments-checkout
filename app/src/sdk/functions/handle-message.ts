import type { Checkout } from "../../types/types";
import { CHECKOUT_STATUS } from "../../utils/constants";
import { logToElement } from "./logger";

export function handleMessage(
  event: MessageEvent,
  checkoutOrigin: string,
  currentIframe: HTMLIFrameElement | null,
  currentCheckout: Checkout | null,
) {
  if (event.origin !== checkoutOrigin) return;
  if (event.source !== currentIframe?.contentWindow) return;
  if (!currentCheckout) return;

  switch (event.data?.type) {
    case CHECKOUT_STATUS.READY:
      logToElement(currentCheckout.logsElementId, "Checkout ready");
      break;

    case CHECKOUT_STATUS.SUCCESS:
      currentCheckout.onSuccess({
        sessionId: event.data.sessionId,
      });
      logToElement(currentCheckout.logsElementId, "Payment Success");
      break;

    case CHECKOUT_STATUS.DECLINED:
      const code = event.data.code;
      const message = event.data.message;
      currentCheckout.onDeclined({
        code,
        message,
      });
      logToElement(currentCheckout.logsElementId, `Payment Declined: ${code} `);
      break;
  }
}
