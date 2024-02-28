// convert english numbers to persian
export const convertToPersianNumber = (number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(number).replace(/[0-9]/g, (digit) => persianDigits[digit]);
};
