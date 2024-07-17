// react imports
import { useMemo, useState, useEffect } from "react";

// mui imports
import {
  IconButton,
  Button,
  Box,
  CircularProgress,
  Tooltip,
  PaginationItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  Close as CloseIcon,
  Done as DoneIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import CreateRelatedForm from "../forms/CreateRelatedForm";
import UpdateRelatedForm from "../forms/UpdateRelatedForm";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function FractionPeriodGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const data = [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "relatedNtionalCode",
        header: "کد ملی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "relatedFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "relatedLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "relatedStatus",
        header: "وضعیت",
        size: 20,
      },
      {
        accessorKey: "relatedBirthDate",
        header: "تاریخ تولد",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "relation",
        header: "نسبت",
        size: 20,
      },
      {
        accessorKey: "editRelatedAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`ویرایش "${row.original.relatedFirstName} ${row.original.relatedLastName}"`}
          >
            <IconButton color="success" sx={{ padding: "0" }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "deleteRelatedAction",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`حذف "${row.original.relatedFirstName} ${row.original.relatedLastName}"`}
          >
            <IconButton color="error" sx={{ padding: "0" }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: data,
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
    // renderTopToolbarCustomActions: () => (
    //   <Box>
    //     {isFetching ? (
    //       <IconButton aria-label="refresh" color="info" disabled>
    //         <CircularProgress size={20} value={100} />
    //       </IconButton>
    //     ) : (
    //       <Tooltip title="بروز رسانی">
    //         <span>
    //           <IconButton
    //             aria-label="refresh"
    //             color="info"
    //             onClick={handleRefresh}
    //           >
    //             <RefreshIcon fontSize="small" />
    //           </IconButton>
    //         </span>
    //       </Tooltip>
    //     )}

    //     {isFetching ? (
    //       <IconButton aria-label="refresh" color="info" disabled>
    //         <CircularProgress size={20} value={100} />
    //       </IconButton>
    //     ) : (
    //       <Tooltip
    //         title={
    //           <span style={{ fontFamily: "sahel", fontSize: "0.8rem" }}>
    //             ایجاد وابسته
    //           </span>
    //         }
    //       >
    //         <span>
    //           <IconButton
    //             aria-label="refresh"
    //             color="success"
    //             onClick={handleShowCreateRelatedModal}
    //           >
    //             <AddIcon fontSize="small" />
    //           </IconButton>
    //         </span>
    //       </Tooltip>
    //     )}
    //   </Box>
    // ),
    muiPaginationProps: {
      shape: "rounded",
      showRowsPerPage: false,
      size: "small",
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

  //   useEffect(() => {
  //     const id = Object.keys(table.getState().rowSelection)[0];

  //     if (id) {
  //       const selected = findById(relatedTableData, id);
  //       setPersonID(id);
  //       setPensionaryID(selected?.pensionaryID);
  //     }
  //   }, [table, rowSelection, relatedTableData]);

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default FractionPeriodGrid;
