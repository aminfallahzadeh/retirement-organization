// react imports
import { useMemo, useState } from "react";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { PaginationItem } from "@mui/material";
import {
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

function FilteredPersonsGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const { filteredPersonsTableData } = useSelector(
    (state) => state.batchStatementsData
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "selectedPersonRowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 10,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "selectedPersonNationalCode",
        header: "کد ملی",
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "selectedPersonName",
        header: "نام",
      },
      {
        accessorKey: "selectedPersonLastName",
        header: "نام خانوادگی",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: filteredPersonsTableData,
    defaultColumn: {
      minSize: 5,
      maxSize: 1000,
    },
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

export default FilteredPersonsGrid;
