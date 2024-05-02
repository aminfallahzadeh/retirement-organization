// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

const data = [
  {
    fishType: "تست",
    maliSal: "۱۲",
    mah: "۵",
  },
  {
    fishType: "تست",
    maliSal: "۱۲",
    mah: "۵",
  },
  {
    fishType: "تست",
    maliSal: "۱۲",
    mah: "۵",
  },
];

export const SlipsPreviewGrid = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "fishType",
        header: "نوع فیش",
      },
      {
        accessorKey: "maliSal",
        header: "سال مالی",
      },
      {
        accessorKey: "mah",
        header: "ماه",
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
        backgroundColor: "rgba(47, 255, 66, .2)",
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

  const content = <MRT_Table table={table} />;

  return content;
};

export default SlipsPreviewGrid;
