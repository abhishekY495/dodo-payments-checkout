import { useState } from "react";
import { CHECKOUT_STATUS } from "../utils/constants";
import { isValidCardNumber } from "../utils/is-valid-card-number";
import { isValidExpiry } from "../utils/is-valid-expiry";
import { formatCardNumber } from "../utils/format-card-number";
import { isValidCvc } from "../utils/is-valid-cvc";

const params = new URLSearchParams(window.location.search);
const parentOrigin = params.get("parentOrigin") ?? "*";

export const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [touched, setTouched] = useState({ card: false, name: false });

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

  const handlePay = () => {
    if (!isFormValid) return;
    window.parent.postMessage(
      { type: CHECKOUT_STATUS.SUCCESS, sessionId: `sess_456456` },
      parentOrigin,
    );
  };

  return (
    <div className="flex flex-col gap-5">
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
          placeholder="1234 1234 1234 1234"
          className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-t-md focus:border-neutral-400 focus:outline-none"
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
            placeholder="MM / YY"
            className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-bl-md focus:border-neutral-400 focus:outline-none"
          />
          <input
            type="text"
            inputMode="numeric"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
            }
            onBlur={() => setTouched((t) => ({ ...t, card: true }))}
            placeholder="CVC"
            className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-br-md focus:border-neutral-400 focus:outline-none"
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
          placeholder="Name on card"
          className="w-full border border-neutral-700 p-2 px-2.5 text-sm rounded-md focus:border-neutral-400 focus:outline-none"
        />
        {nameError && <span className="text-red-400 text-xs">{nameError}</span>}
      </div>

      <button
        onClick={handlePay}
        disabled={!isFormValid}
        className="bg-green-500 text-black text-sm font-semibold p-2 pb-2.5 rounded w-full cursor-pointer disabled:opacity-50 disabled:bg-neutral-100 disabled:cursor-not-allowed"
      >
        Pay now
      </button>
    </div>
  );
};
