export const getCardGroupError = ({
  touched,
  cardNumber,
  cardValid,
  expiryMonth,
  expiryYear,
  expiryValid,
  cvc,
  cvcValid,
}: {
  touched: boolean;
  cardNumber: string;
  cardValid: boolean;
  expiryMonth: string;
  expiryYear: string;
  expiryValid: boolean;
  cvc: string;
  cvcValid: boolean;
}): string | null => {
  if (!touched) return null;
  if (cardNumber.length === 16 && !cardValid)
    return "Card number not recognized";
  if (expiryMonth.length === 2 && expiryYear.length === 2 && !expiryValid)
    return "Invalid or expired date";
  if (cvc.length === 3 && !cvcValid) return "Invalid CVC";
  return null;
};
