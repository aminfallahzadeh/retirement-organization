// STYLES
export const styles = {
  // indicatorsContainer: (base) => ({
  //   ...base,
  //   maxWidth: "100%",
  //   maxHeight: "100%",
  // }),
  container: (base) => ({
    ...base,
    position: "relative",
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
    position: "relative",
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
