// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonnelStatementOffQuery } from "../slices/personnelStatementApiSlice";

// mui imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function PersonnelTariffGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [tableData, setTableData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: tarrifs,
    isSuccess,
    isLoading,
    error,
  } = useGetPersonnelStatementOffQuery({ personID });

  useEffect(() => {
    if (isSuccess) {
      const data = tarrifs.itemList.map((tariff, index) => ({
        rowNum: index + 1,
        personnelStatementOffTypeName: tariff.personnelStatementOffTypeName,
        personnelStatementOffYear: tariff.personnelStatementOffYear,
        personnelStatementOffMonth: tariff.personnelStatementOffMonth,
        personnelStatementOffDay: tariff.personnelStatementOffDay,
      }));
      setTableData(data);
    }
  }, [isSuccess, tarrifs]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

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
        accessorKey: "personnelStatementOffTypeName",
        header: "نوع خدمت",
        size: 20,
      },
      {
        accessorKey: "personnelStatementOffYear",
        header: "سال",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementOffMonth",
        header: "ماه",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementOffDay",
        header: "روز",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "reaclTotal",
        header: "جمع واقعی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "total",
        header: "جمع",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,
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

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );

  return content;
}

export default PersonnelTariffGrid;
