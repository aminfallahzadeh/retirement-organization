// react imports
import { useMemo, useState } from "react";

// rrd imports
import { Link } from "react-router-dom";

// mui imports
import { IconButton } from "@mui/material";
import { RemoveRedEye as RemoveRedEyeIcon } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// utils imports
import { defaultTableOptions } from "../utils.js";

const data = [
  {
    staffNationalCode: "1234567890",
    staffNO: "1234567890",
    staffName: "محمدرضا",
    staffFamilyName: "آقایی",
  },
];

function StaffGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "staffNationalCode",
        header: "کد ملی",
      },
      {
        accessorKey: "staffNO",
        header: "شماره کارمندی",
      },
      {
        accessorKey: "staffName",
        header: "نام",
      },
      {
        accessorKey: "staffFamilyName",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "observeStaff",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <Link to={"/retirement-organization/staff-statements/info"}>
            <IconButton color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = <MaterialReactTable table={table} />;
  return content;
}

export default StaffGrid;
