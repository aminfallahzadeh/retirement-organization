// library imnports
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import { getMRT_RowSelectionHandler } from "material-react-table";

// table default options
export const defaultTableOptions = {
  localization: MRT_Localization_FA,
  enablePagination: true,
  paginationDisplayMode: "pages",
  columnResizeDirection: "rtl",
  enableFullScreenToggle: false,
  positionToolbarAlertBanner: "none",
  initialState: { pagination: { pageSize: 5 } },
  enableRowSelection: true,
  enableMultiRowSelection: false,
  muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
    onClick: (event) =>
      getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
    sx: { cursor: "pointer" },
  }),
};
