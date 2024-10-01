// react imports
import { useEffect, useMemo, useState, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetListOfRetirementStatementsQuery,
  useRemoveRetirementStatementMutation,
} from "../slices/retirementStatementApiSlice.js";

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
  DownloadOutlined as DownloadIcon,
  Refresh as RefreshIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import GenerateStatementForm from "../forms/GenerateStatementForm.jsx";
import RetiredStatementTemplate from "../components/RetiredStatementTemplate.jsx";

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

function RetiredStatementsGrid() {
  const [statementTableData, setStatementTableData] = useState([]);

  const [statementID, setStatementID] = useState(null);
  const [rowSelection, setRowSelection] = useState({});

  // MODAL STATES
  const [showGenerateStatementModal, setShowGenerateStatementModal] =
    useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);
  const [statMessage, setStatMessage] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACTION QUERIES
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
  } = useGetListOfRetirementStatementsQuery({ personID });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = statementList.map((item, index) => ({
        id: item.retirementStatementID,
        statementRowNum: index + 1,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo || "-",
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

  const handleDeleteStatementModalChange = useCallback(() => {
    setShowDeleteStatementModal(true);
  }, []);

  const handleShowStatementModalChange = () => {
    setShowStatementModal(true);
  };

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

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "statementRowNum",
        size: 20,
        header: "دریف",
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "retirementStatementNo",
        size: 20,
        header: "شماره حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
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
        accessorKey: "downloadRetiredStatement",
        header: "مشاهده/چاپ",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`سریال ${convertToPersianNumber(
              row.original.retirementStatementSerial
            )}`}
          >
            <IconButton
              color="primary"
              onClick={handleShowStatementModalChange}
              sx={{ padding: "0" }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ];

    if (
      location.pathname !== "/retirement-organization/personnel-statements/info"
    ) {
      baseColumns.push({
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
      });
    }

    return baseColumns;
  }, [handleDeleteStatementModalChange, location.pathname]);

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
    initialState: {
      density: "compact",
      showGlobalFilter: true,
      sorting: [
        {
          id: "retirementStatementIssueDate",
          desc: true,
        },
      ],
    },
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "300px" } },
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
            count={5}
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
                setShowStatModal={setShowStatModal}
                setStatMessage={setStatMessage}
              />
            </Modal>
          ) : showStatementModal && statementID ? (
            <Modal closeModal={() => setShowStatementModal(false)}>
              <RetiredStatementTemplate
                statementID={statementID}
                setShowStatementModal={setShowStatementModal}
              />
            </Modal>
          ) : showStatModal ? (
            <Modal>
              <div
                className="paragraph-primary"
                style={{
                  width: "60ch",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <InfoIcon color="info" fontSize="large" />
                <span style={{ marginRight: "5px" }}>{statMessage}</span>
              </div>

              <div className="flex-row flex-center">
                <Button
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  onClick={() => setShowStatModal(false)}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>تایید</span>
                </Button>
              </div>
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
