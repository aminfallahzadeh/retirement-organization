// library imports
import momentj from "moment-jalaali";
import PN from "persian-number";

// convert to persian number
export const convertToPersianNumber = (num) => {
  if (num || num === 0) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const result = String(num).replace(/\d/g, (match) => persianDigits[match]);
    return result;
  }
  return "";
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
export const findById = (data, id, fieldName = "id") => {
  return data.find((item) => item[fieldName] === id);
};
// generate captcha
export const generateCaptcha = (len) => {
  const characters = "0123456789";
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
  return null;
};

export const convertToPersianDateFormatted = (date) => {
  if (date) {
    const result = momentj(date).format("jYYYY/jMM/jDD");
    return convertToPersianNumber(result);
  }

  return "-";
};

export const convertToEnglishDateObject = (date) => {
  if (date) {
    const result = momentj(date, "jYYYY/jM/jD");
    return result;
  }
  return null;
};

export const convertObjectToPersianDate = (obj) => {
  const result = momentj(obj).format("jYYYY/jMM/jDD");
  return result;
};

export const separateByThousands = (num) => {
  // Convert input to a float
  num = parseFloat(convertToEnglishNumber(num));

  // Check if the conversion resulted in NaN
  if (isNaN(num)) {
    return "";
  }

  // Check if the number is 0
  if (num === 0) {
    return "۰";
  }

  let result = "";
  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);
  const [integerPart, decimalPart] = absoluteNum.toString().split(".");

  for (let i = 0; i < integerPart.length; i++) {
    const c = integerPart.substr(integerPart.length - i - 1, 1);
    if (i % 3 === 0 && i > 0) {
      result = c + "," + convertToPersianNumber(result);
    } else {
      result = c + convertToPersianNumber(result);
    }
  }

  result = decimalPart
    ? convertToPersianNumber(result) + "." + decimalPart
    : convertToPersianNumber(result);
  return isNegative
    ? "-" + convertToPersianNumber(result)
    : convertToPersianNumber(result);
};

export const removeSeparators = (str) => {
  return str.toString().replace(/,/g, "");
};

export const reverseString = (str) => {
  var splitString = str.split("");

  var reverseArray = splitString.reverse();

  var joinArray = reverseArray.join("");

  return joinArray;
};

// CONVERT TO PERSIAN WORDS
export const convertToPersianWords = (num) => {
  return PN.convert(num);
};
