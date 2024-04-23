// library imports
import momentj from "moment-jalaali";

// convert to persian number
export const convertToPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const result = String(num).replace(/\d/g, (match) => persianDigits[match]);
  return result;
};

// convert to english number
export const convertToEnglishNumber = (str) => {
  let persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];

  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

// find item by id
export const findById = (data, id) => {
  return data.find((item) => item.id === id);
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

// change date to persian date
export const convertToPersianDate = (date) => {
  if (date) {
    const result = momentj(date);
    return result;
  }
  return;
};

export const convertToPersianDateFormatted = (data) => {
  const result = momentj(data).format("jYYYY-jMM-jDD");
  return result;
};
