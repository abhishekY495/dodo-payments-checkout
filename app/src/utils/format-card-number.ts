export const formatCardNumber = (digits: string) =>
  digits.match(/.{1,4}/g)?.join(" ") ?? digits;
