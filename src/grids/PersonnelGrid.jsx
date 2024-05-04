// react imports
import { useMemo, useState, useEffect } from "react";

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
  const [data, setData] = useState([]);

  const { personTableData } = useSelector((state) => state.personData);

  useEffect(() => {
    if (personTableData.length > 0) {
      const mappedData = personTableData.map((item) => ({
        personNationalCode: item.personNationalCode,
        personFirstName: item.personFirstName,
        personLastName: item.personLastName,
      }));
      setData(mappedData);
    }
  }, [personTableData]);

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
        Cell: () => (
          <Link to={"/retirement-organization/personnel-statements/info"}>
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

export default PersonnelGrid;
