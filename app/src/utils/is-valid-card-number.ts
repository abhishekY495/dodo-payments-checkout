import { VALID_TEST_CARDS } from "./constants";

export const isValidCardNumber = (value: string) => {
  return VALID_TEST_CARDS.includes(value);
};
