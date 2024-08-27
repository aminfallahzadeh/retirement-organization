// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

// helpers
import { convertToPersianNumber } from "../../helper.js";

export const UnderWarantyAmountMenGrid = ({ data, retiredType }) => {
  const columns = useMemo(() => {
    let baseColumns;

    if (retiredType === "true") {
      baseColumns = [
        {
          accessorKey: "SpouseOfAliveMenRetireds",
          header: "عائله مندی",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "DaughterOfAliveMenRetireds",
          header: "دختر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "SonOfAliveMenRetireds",
          header: "پسر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    } else if (retiredType === "false") {
      baseColumns = [
        {
          accessorKey: "SpouseOfDeadMenRetireds",
          header: "عائله مندی",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "SonOfDeadMenRetireds",
          header: "دختر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "DaughterOfDeadMenRetireds",
          header: "پسر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    } else {
      baseColumns = [
        {
          accessorKey: "SpouseOfAllMenRetireds",
          header: "عائله مندی",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "SonOfAllMenRetireds",
          header: "دختر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "DaughterOfAllMenRetireds",
          header: "پسر",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    }

    return baseColumns;
  }, [retiredType]);

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
    renderCaption: () => "مرد",
  });

  return <MRT_Table table={table} />;
};

export default UnderWarantyAmountMenGrid;
