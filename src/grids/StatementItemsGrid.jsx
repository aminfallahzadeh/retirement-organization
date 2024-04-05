import { useMemo } from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";

const data = [
  {
    itemType: "حقوق مبنا",
    incrementType: "درصد",
    amount: "۲۰",
    year: "۱۴۰۳",
  },
  {
    itemType: "عائله مندی",
    incrementType: "مبلغ",
    amount: "۲۰,۰۰۰",
    year: "۱۴۰۳",
  },
];

export const StatementItemsgrid = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "itemType",
        header: "نوع آیتم",
      },
      {
        accessorKey: "incrementType",
        header: "نوع افزایش",
      },
      {
        accessorKey: "amount",
        header: "مقدار",
      },
      {
        accessorKey: "year",
        header: "سال",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    initialState: {
      density: "compact",
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        borderRadius: "3px",
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "rgba(0, 78, 152, .2)",
        color: "#333533",
        fontFamily: "sahel",
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontFamily: "sahel",
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default StatementItemsgrid;
