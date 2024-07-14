// STYLES
export const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    cursor: "pointer",
    fontSize: "12px",
    height: "100%",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "IranYekan",
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
};

// COMON SETTINGS
export const settings = {
  noOptionsMessage: () => "موردی یافت نشد!",
  loadingMessage: () => "در حال بارگذاری ...",
};
