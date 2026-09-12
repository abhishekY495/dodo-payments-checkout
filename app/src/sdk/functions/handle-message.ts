import type { Checkout } from "../../types/types";
import { CHECKOUT_STATUS } from "../../utils/constants";

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
      console.log("Checkout ready");
      break;

    case CHECKOUT_STATUS.SUCCESS:
      currentCheckout.onSuccess({
        sessionId: event.data.sessionId,
      });
      break;

    case CHECKOUT_STATUS.ERROR:
      currentCheckout.onError({
        code: event.data.code,
        message: event.data.message,
      });
      break;
  }
}
