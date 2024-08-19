// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

// helpers
import { convertToPersianNumber } from "../../helper.js";

export const SupplementaryGrid = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "SumSupplementaryAmounts",
        header: "کل",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "SumSupplementaryAmountsOfWomenRetireds",
        header: "زن",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "SumSupplementaryAmountsOfMenRetireds",
        header: "مرد",
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
    renderCaption: () => "بازنشستگی تکمیلی",
  });

  return <MRT_Table table={table} />;
};

export default SupplementaryGrid;
