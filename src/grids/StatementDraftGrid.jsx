// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";
import { Button } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const data = [
  {
    nationalCode: "۱۲۳۴۵۶۷۸",
    fname: "امین",
    lname: "فلاح زاده",
    salaryBase: "۱۲۳۴۵",
    supplementaryRetirement: "test",
    family: "test",
    childrenRight: "test",
  },
  {
    nationalCode: "۱۲۳۴۵۶۷۸",
    fname: "امین",
    lname: "فلاح زاده",
    salaryBase: "۱۲۳۴۵",
    supplementaryRetirement: "test",
    family: "test",
    childrenRight: "test",
  },
  {
    nationalCode: "۱۲۳۴۵۶۷۸",
    fname: "امین",
    lname: "فلاح زاده",
    salaryBase: "۱۲۳۴۵",
    supplementaryRetirement: "test",
    family: "test",
    childrenRight: "test",
  },
];

export const StatementDraftGrid = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "nationalCode",
        header: "شماره ملی",
      },
      {
        accessorKey: "fname",
        header: "نام",
      },
      {
        accessorKey: "lname",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "salaryBase",
        header: "حقوق مبنا",
      },
      {
        accessorKey: "supplementaryRetirement",
        header: "بازنشستگی تکمیلی",
      },
      {
        accessorKey: "family",
        header: "عائله مندی",
      },
      {
        accessorKey: "childrenRight",
        header: "حق اولاد",
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

  const content = (
    <div className="flex-col">
      <MRT_Table table={table} />

      <div style={{ marginRight: "auto" }}>
        <Button
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ثبت پیش نویس</span>
        </Button>
      </div>
    </div>
  );

  return content;
};

export default StatementDraftGrid;
