// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

// helpers
import { convertToPersianNumber } from "../../helper.js";

export const UnderWarantyAmountWomenGrid = ({ data, retiredType }) => {
  const columns = useMemo(() => {
    let baseColumns;

    switch (retiredType) {
      case "true":
        baseColumns = [
          {
            accessorKey: "SpouseOfAliveWomenRetireds",
            header: "عائله مندی",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "DaughterOfAliveWomenRetireds",
            header: "دختر",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "SonOfAliveWomenRetireds",
            header: "پسر",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
        ];
        break;

      case "false":
        baseColumns = [
          {
            accessorKey: "SpouseOfDeadWomenRetireds",
            header: "عائله مندی",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "DaughterOfDeadWomenRetireds",
            header: "دختر",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "SonOfDeadWomenRetireds",
            header: "پسر",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
        ];
        break;

      default:
        baseColumns = [
          {
            accessorKey: "SpouseOfAllWomenRetireds",
            header: "عائله مندی",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "DaughterOfAllWomenRetireds",
            header: "دختر",
            Cell: ({ renderedCellValue }) => (
              <span>{convertToPersianNumber(renderedCellValue)}</span>
            ),
          },
          {
            accessorKey: "SonOfAllWomenRetireds",
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
    renderCaption: () => "مستمری بگیر زن",
  });

  return <MRT_Table table={table} />;
};

export default UnderWarantyAmountWomenGrid;
