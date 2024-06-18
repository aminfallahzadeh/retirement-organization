// react imports
import { useMemo, useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";
import { useLazyGetRetiredQuery } from "../slices/retiredApiSlice";
import { useLazyGetRetirementStatementQuery } from "../slices/retirementStatementApiSlice.js";

// mui imports
import { IconButton, Tooltip, Box, CircularProgress } from "@mui/material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  DownloadOutlined as DownloadIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";
import { createStatementPDF } from "../generateStatementPDF.js";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PersonnelStatementGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [personnelStatementTableData, setPersonnelStatementTableData] =
    useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");
  const personDeathDate = searchParams.get("personDeathDate");

  // ACTION QUERIES
  const [getRetired, { isFetching: isRetiredFetching }] =
    useLazyGetRetiredQuery();
  const [getRetirementStatement, { isFetching: isStatementFetching }] =
    useLazyGetRetirementStatementQuery();

  const {
    data: statements,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetPersonnelStatementQuery({ personID });

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      const data = statements.itemList.map((item) => ({
        id: item.personnelStatementID,
        personnelStatementSerial: item.personnelStatementSerial,
        personnelStatementNumber: item.personnelStatementNumber,
        personnelStatementTypeName: item.personnelStatementTypeName,
        personnelStatementIssueDate: item.personnelStatementIssueDate,
        personnelStatementRunDate: item.personnelStatementRunDate,
      }));
      setPersonnelStatementTableData(data);
    }
  }, [isSuccess, statements]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const handleDownload = useCallback(
    async (RetirementStatementID) => {
      try {
        const retiredRes = await getRetired(personID).unwrap();
        const statementRes = await getRetirementStatement({
          RetirementStatementID,
        }).unwrap();

        createStatementPDF(
          retiredRes.itemList[0],
          statementRes,
          personDeathDate
        );
      } catch (err) {
        console.log(err);
        toast.error("خطایی رخ داده است", { autoClose: 2000 });
      }
    },

    [getRetired, personID, getRetirementStatement, personDeathDate]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "personnelStatementSerial",
        header: "سریال حکم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementNumber",
        header: "شماره حکم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue) || "-"}</div>
        ),
      },
      {
        accessorKey: "personnelStatementTypeName",
        header: "نوع حکم",
        size: 20,
      },
      {
        accessorKey: "personnelStatementIssueDate",
        header: "تاریخ صدور",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementRunDate",
        header: "تاریخ اجرا",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "downloadStatement",
        header: "مشاهده/چاپ",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`سریال ${convertToPersianNumber(
              row.original.personnelStatementSerial
            )}`}
          >
            <IconButton
              color="primary"
              onClick={() => handleDownload(row.original.id)}
              sx={{ padding: "0" }}
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
    data: personnelStatementTableData,
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
    renderTopToolbarCustomActions: () => (
      <Box>
        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} />
          </IconButton>
        ) : (
          <Tooltip title="بروز رسانی">
            <span>
              <IconButton
                aria-label="refresh"
                color="info"
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    ),
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
            count={5}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <>
          {isStatementFetching || isRetiredFetching ? (
            <Modal title="در حال بارگذاری ...">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem 10rem",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            </Modal>
          ) : null}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default PersonnelStatementGrid;
