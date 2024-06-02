// react imports
import { useEffect, useMemo, useState, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useLazyGetListOfRetirementStatementsQuery,
  useRemoveRetirementStatementMutation,
} from "../slices/retirementStatementApiSlice.js";
import { setStatementTableData } from "../slices/statementDataSlice.js";

// mui imports
import {
  IconButton,
  Button,
  Box,
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
  RemoveRedEye as RemoveRedEyeIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import GenerateStatementForm from "../forms/GenerateStatementForm.jsx";
import RetirementStatementViewForm from "../forms/RetirementStatementViewForm.jsx";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredStatementsGrid() {
  const [statementID, setStatementID] = useState(null);

  const [rowSelection, setRowSelection] = useState({});

  const { personDeathDate } = useSelector((state) => state.retiredState);

  // MODAL STATES
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showGenerateStatementModal, setShowGenerateStatementModal] =
    useState(false);
  const [showViewStatementModal, setShowViewStatementModal] = useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACCESS THE PENSIONARY STATE FROM STORE
  const { isPensionary } = useSelector((state) => state.retiredState);

  const [getStatementList, { isLoading, isFetching }] =
    useLazyGetListOfRetirementStatementsQuery();

  const [removeRetirmentStatement, { isLoading: isDeleting }] =
    useRemoveRetirementStatementMutation();

  // access the data from redux store
  const { statementTableData } = useSelector((state) => state.statementData);

  // HANDLERS
  const handleGenerateStatementModalChange = () => {
    setShowGenerateStatementModal(true);
  };

  const handleDeleteStatementModalChange = () => {
    setShowDeleteStatementModal(true);
  };

  const handleShowStatementModal = () => {
    setShowStatementModal(true);
  };

  const handleSowViewStatementModalChange = () => {
    setShowViewStatementModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // FUNCTION TO FILL THE STATEMENT PDF
  const fillPDF = async () => {
    const url = "./pdfs/related-placeholder.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    form.getTextField("personNationalCode").setText("1234567890");

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "حکم.pdf");
  };

  const handleDownload = useCallback(() => {
    fillPDF();
  }, []);

  const getList = useCallback(async () => {
    try {
      const getListRes = await getStatementList(personID).unwrap();
      const mappedDate = getListRes.map((item) => ({
        id: item.retirementStatementID,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo,
        retirementStatementIssueDate: item.retirementStatementIssueDate,
        retirementStatementRunDate: item.retirementStatementRunDate,
        retirementStatementIssueConfirmDate:
          item.retirementStatementIssueConfirmDate,
      }));

      dispatch(setStatementTableData(mappedDate));
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  }, [dispatch, getStatementList, personID]);

  const handleRemoveStatement = async () => {
    try {
      const deleteRes = await removeRetirmentStatement({
        rsID: statementID,
      }).unwrap();
      getList();
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

  useEffect(() => {
    if (isPensionary) {
      getList();
    }
  }, [
    isPensionary,
    getList,
    showGenerateStatementModal,
    showViewStatementModal,
    showDeleteStatementModal,
  ]);

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
        header: "مشاهده حکم",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton
            color="primary"
            onClick={handleSowViewStatementModalChange}
          >
            <RemoveRedEyeIcon />
          </IconButton>
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
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <Button
          dir="ltr"
          endIcon={<AddIcon />}
          variant="contained"
          disabled={!isPensionary}
          onClick={handleGenerateStatementModalChange}
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>صدور</span>
        </Button>

        <LoadingButton
          dir="ltr"
          endIcon={<RefreshIcon />}
          loading={isFetching}
          disabled={!isPensionary}
          onClick={getList}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بروز رسانی</span>
        </LoadingButton>
      </Box>
    ),
    muiPaginationProps: {
      color: "success",
      variant: "outlined",
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
  }, [dispatch, table, rowSelection, statementTableData]);

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
          {showStatementModal ? (
            <Modal title="حکم" closeModal={() => setShowStatementModal(false)}>
              <div className="flex-col flex-center">
                <img
                  src={
                    personDeathDate
                      ? "./images/hokm-movazzaf.png"
                      : "./images/hokm-sample.png"
                  }
                  alt="نمونه حکم"
                />

                <Button
                  dir="ltr"
                  endIcon={<PrintIcon />}
                  onClick={handleDownload}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>دانلود</span>
                </Button>
                <Button
                  dir="ltr"
                  endIcon={<PrintIcon />}
                  onClick={handlePrint}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>چاپ</span>
                </Button>
              </div>
            </Modal>
          ) : showViewStatementModal ? (
            <Modal
              title={"مشاهده حکم"}
              closeModal={() => setShowViewStatementModal(false)}
            >
              <RetirementStatementViewForm statementID={statementID} />
            </Modal>
          ) : showDeleteStatementModal ? (
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
          ) : null}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default RetiredStatementsGrid;
