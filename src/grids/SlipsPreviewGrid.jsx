// react imports
import { useMemo, useState, useCallback } from "react";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { IconButton } from "@mui/material";
import { PaginationItem, Tooltip } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  DownloadOutlined as DownloadIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
  separateByThousands,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";
import { createSlipsPDF } from "../generateSlipsPDF.js";

function PersonnelStatementGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const { slipsTableData } = useSelector((state) => state.slipsData);

  // SLIP DOWNLOAD HANDLER
  const handleDownload = useCallback(() => {
    createSlipsPDF();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "payLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "accountNo",
        header: "شماره حساب",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payCreditAmount",
        header: "بستانکاری",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}
          </div>
        ),
      },
      {
        accessorKey: "payDebitAmount",
        header: "بدهکاری",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}
          </div>
        ),
      },
      {
        accessorKey: "payAmount",
        header: "مبلغ کل",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payDate",
        header: "تاریخ پرداخت",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "downloadSlip",
        header: "مشاهده/چاپ",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <Tooltip title="دانلود و مشاهده فیش">
            <IconButton
              color="primary"
              sx={{ padding: "0" }}
              onClick={handleDownload}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [handleDownload]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: slipsTableData,
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  // useEffect(() => {
  //   const id = Object.keys(table.getState().rowSelection)[0];
  //   const selectedGroup = findById(groupsTableData, id);
  // }, []);

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default PersonnelStatementGrid;
