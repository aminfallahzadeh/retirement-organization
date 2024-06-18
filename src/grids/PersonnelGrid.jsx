// react imports
import { useMemo, useState } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { IconButton, PaginationItem, Tooltip } from "@mui/material";
import {
  RemoveRedEye as RemoveRedEyeIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// helpers
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function PersonnelGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { personTableData } = useSelector((state) => state.personData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "personFirstName",
        header: "نام",
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "personID",
        header: "شماره کارمندی",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "observeStaff",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`${row.original.personFirstName} ${row.original.personLastName}`}
          >
            <Link
              to={`/retirement-organization/personnel-statements/info?personID=${row.id}&personDeathDate=${row.original.personDeathDate}`}
            >
              <IconButton color="primary" sx={{ padding: "0" }}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: personTableData,
    muiPaginationProps: {
      size: "small",
      shape: "rounded",
      showRowsPerPage: false,
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
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
