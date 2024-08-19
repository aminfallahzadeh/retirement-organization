// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

// helpers
import { convertToPersianNumber } from "../../helper.js";

export const SacrificeCondtionsGrid = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "CountOfAllPensionariesWith1SacrificationState",
        header: "یک وضعیت",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "CountOfAllPensionariesWith2SacrificationState",
        header: "دو وضعیت",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "CountOfAllPensionariesWith3SacrificationState",
        header: "سه وضعیت",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
          textAlign: "center",
          fontFamily: "IranYekan",
          fontSize: "16px",
        },
      },
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontStyle: "italic",
        fontWeight: "normal",
        fontFamily: "IranYekan",
      },
    },
    muiTableBodyCellProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    renderCaption: () => "وضعیت های ایثارگری",
  });

  return <MRT_Table table={table} />;
};

export default SacrificeCondtionsGrid;
