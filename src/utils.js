// mui imports
import { MRT_Localization_FA } from "material-react-table/locales/fa";

// table default options
export const defaultTableOptions = {
  localization: MRT_Localization_FA,
  paginationDisplayMode: "pages",
  enableFullScreenToggle: false,
  positionToolbarAlertBanner: "none",
  enableStickyHeader: true,
  enableStickyFooter: true,
  enableDensityToggle: false,
  muiTableBodyCellProps: {
    align: "center",
    sx: {
      fontFamily: "IranYekan",
      borderRight: "1px solid #cfcfcf",
    },
  },
  muiTableHeadCellProps: {
    align: "center",
    sx: {
      borderRight: "1px solid #cfcfcf",
      fontFamily: "Vazir",
      fontWeight: "600",
    },
  },
  initialState: {
    density: "compact",
  },
};
