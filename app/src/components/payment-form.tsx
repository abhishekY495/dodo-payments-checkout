import { useState } from "react";
import type { PaymentState } from "../types/types";
import { CHECKOUT_STATUS } from "../utils/constants";
import { isValidCardNumber } from "../utils/is-valid-card-number";
import { isValidExpiry } from "../utils/is-valid-expiry";
import { formatCardNumber } from "../utils/format-card-number";
import { isValidCvc } from "../utils/is-valid-cvc";
import { simulatePayment } from "../utils/simulate-payment";
import { Success } from "./success";

export const PaymentForm = ({ parentOrigin }: { parentOrigin: string }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [touched, setTouched] = useState({ card: false, name: false });

  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [declineMessage, setDeclineMessage] = useState<string | null>(null);

  const cardValid = isValidCardNumber(cardNumber);
  const expiryValid = isValidExpiry(expiryMonth, expiryYear);
  const cvcValid = isValidCvc(cvc);
  const nameValid = cardholderName.trim().length > 0;

  const isFormValid = cardValid && expiryValid && cvcValid && nameValid;

  const cardGroupError =
    touched.card && cardNumber.length === 16 && !cardValid
      ? "Card number not recognized"
      : touched.card &&
          expiryMonth.length === 2 &&
          expiryYear.length === 2 &&
          !expiryValid
        ? "Invalid or expired date"
        : touched.card && cvc.length === 3 && !cvcValid
          ? "Invalid CVC"
          : null;
  const nameError = touched.name && !nameValid ? "Name is required" : null;

  const handlePay = async () => {
    if (!isFormValid || paymentState === "processing") return;

    setPaymentState("processing");
    setDeclineMessage(null);

    const result = await simulatePayment(cardNumber);

    if (result.status === "success") {
      setPaymentState("success");
      window.parent.postMessage(
        { type: CHECKOUT_STATUS.SUCCESS, sessionId: result.sessionId },
        parentOrigin,
      );
    } else {
      setPaymentState("declined");
      setDeclineMessage(result.message);
      window.parent.postMessage(
        {
          type: CHECKOUT_STATUS.DECLINED,
          code: result.code,
          message: result.message,
        },
        parentOrigin,
      );
    }
  };

  if (paymentState === "success") {
    return <Success />;
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl font-semibold">Complete Your Purchase</p>
      <div>
        <p className="text-sm text-neutral-400 pb-1.5 pl-1">Card information</p>
        <input
          type="text"
          inputMode="numeric"
          value={formatCardNumber(cardNumber)}
          onChange={(e) =>
            setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
          }
          onBlur={() => setTouched((t) => ({ ...t, card: true }))}
          disabled={paymentState === "processing"}
          placeholder="1234 1234 1234 1234"
          className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-t-md focus:border-neutral-400 focus:outline-none disabled:opacity-50"
        />
        <div className="flex">
          <input
            type="text"
            inputMode="numeric"
            value={
              expiryMonth || expiryYear
                ? `${expiryMonth}${expiryYear ? " / " + expiryYear : ""}`
                : ""
            }
            onChange={(e) => {
              const text = e.target.value.replace(/\D/g, "").slice(0, 4);
              setExpiryMonth(text.slice(0, 2));
              setExpiryYear(text.slice(2, 4));
            }}
            onBlur={() => setTouched((t) => ({ ...t, card: true }))}
            disabled={paymentState === "processing"}
            placeholder="MM / YY"
            className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-bl-md focus:border-neutral-400 focus:outline-none disabled:opacity-50"
          />
          <input
            type="text"
            inputMode="numeric"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
            }
            onBlur={() => setTouched((t) => ({ ...t, card: true }))}
            disabled={paymentState === "processing"}
            placeholder="CVC"
            className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-br-md focus:border-neutral-400 focus:outline-none disabled:opacity-50"
          />
        </div>
        {cardGroupError && (
          <span className="text-red-400 text-xs">{cardGroupError}</span>
        )}
      </div>

      <div>
        <p className="text-sm text-neutral-400 pb-1.5 pl-1">Cardholder name</p>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          disabled={paymentState === "processing"}
          placeholder="Name on card"
          className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-md focus:border-neutral-400 focus:outline-none disabled:opacity-50"
        />
        {nameError && <span className="text-red-400 text-xs">{nameError}</span>}
      </div>

      {declineMessage && (
        <div className="text-red-400 text-xs bg-red-950/30 border border-red-900 rounded p-2">
          {declineMessage}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={!isFormValid || paymentState === "processing"}
        className="bg-green-500 text-black text-sm font-semibold p-2 pb-2.5 rounded w-full cursor-pointer disabled:opacity-50 disabled:bg-neutral-100 disabled:cursor-not-allowed"
      >
        {paymentState === "processing" ? "Processing…" : "Pay now"}
      </button>
    </div>
  );
};
