// react imports
import { useMemo, useState } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { IconButton } from "@mui/material";
import { RemoveRedEye as RemoveRedEyeIcon } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// utils imports
import { defaultTableOptions } from "../utils.js";

function PersonnelGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { personTableData } = useSelector((state) => state.personData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
      },
      {
        accessorKey: "staffNO",
        header: "شماره کارمندی",
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "observeStaff",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Link
            to={`/retirement-organization/personnel-statements/info?personID=${row.id}`}
          >
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
    data: personTableData,
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

export default PersonnelGrid;
