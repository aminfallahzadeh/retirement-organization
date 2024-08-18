// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

export const DashboardSumGrid = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "AliveRetireds",
        header: "مجموع مرد و زن",
      },
      {
        accessorKey: "AliveRetiredsMen",
        header: "تعداد مرد",
      },
      {
        accessorKey: "AliveRetiredsWomen",
        header: "تعداد زن",
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
    renderCaption: () => "مجموع مستمری بگیران",
  });

  return <MRT_Table table={table} />;
};

export default DashboardSumGrid;
