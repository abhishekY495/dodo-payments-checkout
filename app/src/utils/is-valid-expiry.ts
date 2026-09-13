export const isValidExpiry = (mm: string, yy: string) => {
  if (!/^\d{2}$/.test(mm) || !/^\d{2}$/.test(yy)) return false;
  const month = parseInt(mm, 10);
  const year = parseInt(yy, 10);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
};
