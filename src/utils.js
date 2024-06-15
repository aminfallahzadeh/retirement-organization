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
      fontFamily: "Vazir",
      borderRight: "1px solid #cfcfcf",
    },
  },
  muiTableHeadCellProps: {
    align: "center",
    sx: {
      color: "#001a57",
      fontFamily: "Vazir",
      backgroundColor: "rgba(47, 255, 66, .4)",
      borderRight: "1px solid #cfcfcf",
      fontWeight: "600",
    },
  },
  initialState: {
    density: "compact",
  },
};
