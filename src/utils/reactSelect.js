// STYLES
export const selectStyles = {
  container: (base) => ({
    ...base,
    position: "relative",
    height: "100%",
  }),
  control: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    cursor: "pointer",
    fontSize: "12px",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "auto",
    textOverflow: "ellipsis",
    position: "relative",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    zIndex: "5",
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  menuList: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    zIndex: "5",
  }),
};

// COMON SETTINGS
export const selectSettings = {
  noOptionsMessage: () => "موردی یافت نشد!",
  loadingMessage: () => "در حال بارگذاری ...",
};

// OPTIONS CREATOR
export const optionsGenerator = (data, valueKey, labelKey) => {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
