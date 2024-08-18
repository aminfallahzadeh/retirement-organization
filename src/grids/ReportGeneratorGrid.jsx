// react imports
import { useMemo, useState } from "react";

// redux imports

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

function ReportGeneratorGrid({ tableData }) {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => {
    if (!tableData || tableData.length === 0) return [];

    return Object.keys(tableData[0]).map((key) => ({
      accessorKey: key,
      header: key,
      size: 20,
      Cell: ({ renderedCellValue }) =>
        renderedCellValue === true ? (
          <div>فعال</div>
        ) : !renderedCellValue ? (
          <div>-</div>
        ) : (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
    }));
  }, [tableData]);

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,
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

export default ReportGeneratorGrid;
