// react imports
import { useEffect, useMemo, useState, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import {
  useGetListOfRetirementStatementsQuery,
  useRemoveRetirementStatementMutation,
  useLazyGetRetirementStatementQuery,
} from "../slices/retirementStatementApiSlice.js";
import { useLazyGetRetiredQuery } from "../slices/retiredApiSlice";

// mui imports
import {
  IconButton,
  Button,
  Box,
  Tooltip,
  PaginationItem,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import GenerateStatementForm from "../forms/GenerateStatementForm.jsx";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

import { createStatementPDF } from "../generateStatementPDF.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredStatementsGrid() {
  const [statementTableData, setStatementTableData] = useState([]);

  const [statementID, setStatementID] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const { personDeathDate } = useSelector((state) => state.retiredState);

  // MODAL STATES
  const [showGenerateStatementModal, setShowGenerateStatementModal] =
    useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACTION QUERIES
  const [getRetired, { isFetching: isRetiredFetching }] =
    useLazyGetRetiredQuery();
  const [getRetirementStatement, { isFetching: isStatementFetching }] =
    useLazyGetRetirementStatementQuery();
  const [removeRetirmentStatement, { isLoading: isDeleting }] =
    useRemoveRetirementStatementMutation();

  // GET & FETCH STATMENTS LIST
  const {
    data: statementList,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetListOfRetirementStatementsQuery(personID);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = statementList.map((item) => ({
        id: item.retirementStatementID,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo,
        retirementStatementIssueDate: item.retirementStatementIssueDate,
        retirementStatementRunDate: item.retirementStatementRunDate,
        retirementStatementIssueConfirmDate:
          item.retirementStatementIssueConfirmDate,
      }));

      setStatementTableData(data);
    }
  }, [
    isSuccess,
    refetch,
    statementList,
    showGenerateStatementModal,
    showDeleteStatementModal,
  ]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // HANDLERS
  const handleRefresh = () => {
    refetch();
  };

  const handleGenerateStatementModalChange = () => {
    setShowGenerateStatementModal(true);
  };

  const handleDeleteStatementModalChange = () => {
    setShowDeleteStatementModal(true);
  };

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

  const handleRemoveStatement = async () => {
    try {
      const deleteRes = await removeRetirmentStatement({
        rsID: statementID,
      }).unwrap();
      refetch();
      setShowDeleteStatementModal(false);
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "retirementStatementNo",
        size: 20,
        header: "شماره حکم",
      },
      {
        accessorKey: "retirementStatementSerial",
        size: 20,
        header: "سریال حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "retirementStatementTypeName",
        header: "نوع حکم",
      },
      {
        accessorKey: "retirementStatementIssueDate",
        header: "تاریخ صدور",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "retirementStatementRunDate",
        header: "تاریخ اجرا",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "observeStatement",
        header: "مشاهده/چاپ",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`دانلود و مشاهده حکم با سریال ${convertToPersianNumber(
              row.original.retirementStatementSerial
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
      {
        accessorKey: "removeStatement",
        header: "حذف حکم",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={
              row.original.retirementStatementIssueConfirmDate
                ? "حکم تایید شده"
                : "حذف حکم"
            }
          >
            <span>
              <IconButton
                color="error"
                disabled={
                  row.original.retirementStatementIssueConfirmDate
                    ? true
                    : false
                }
                onClick={handleDeleteStatementModalChange}
                sx={{ padding: "0" }}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        ),
      },
    ],
    [handleDownload]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: statementTableData,
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
        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} color={"success"} />
          </IconButton>
        ) : (
          <Tooltip title="صدور حکم">
            <span>
              <IconButton
                aria-label="refresh"
                color="success"
                onClick={handleGenerateStatementModalChange}
              >
                <AddIcon fontSize="small" />
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      setStatementID(id);
    }
  }, [table, rowSelection, statementTableData]);

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
        <>
          {showDeleteStatementModal ? (
            <Modal
              title={"حذف حکم"}
              closeModal={() => setShowDeleteStatementModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این حکم اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  variant="contained"
                  onClick={handleRemoveStatement}
                  loading={isDeleting}
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>بله</span>
                </LoadingButton>
                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  onClick={() => setShowDeleteStatementModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : showGenerateStatementModal ? (
            <Modal
              title={"ایجاد حکم بازنشسته"}
              closeModal={() => setShowGenerateStatementModal(false)}
            >
              <GenerateStatementForm
                setShowGenerateStatementModal={setShowGenerateStatementModal}
              />
            </Modal>
          ) : isStatementFetching || isRetiredFetching ? (
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

export default RetiredStatementsGrid;
