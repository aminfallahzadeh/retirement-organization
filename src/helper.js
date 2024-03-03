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
