// // convert english numbers to persian
// export const convertToPersianNumber = (num) => {
//   const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return String(num).replace(/[0-9]/g, (digit) => persianDigits[digit]);
// };

// convert english numbers to persian
export const convertToPersianNumber = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let result = "";
  const str = num.toString();
  for (let c of str) {
    result += persianDigits.charAt(c);
  }
  return result;
};
