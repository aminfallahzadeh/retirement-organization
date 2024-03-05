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

// find item by id
export const findById = (data, id) => {
  return data.find((item) => item._id === id);
};

// generate captcha
export const generateCaptcha = (len) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
