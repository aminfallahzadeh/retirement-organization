// react imports
import { useEffect, useMemo, useState } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetListOfRetirementStatementsQuery } from "../slices/retirementStatementApiSlice.js";
import {
  setStatementTableData,
  setSelectedStatementData,
} from "../slices/statementDataSlice.js";

// mui imports
import { IconButton, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import RetiredStatementInfoForm from "../forms/RetiredStatementInfoForm";
import GenerateStatementForm from "../forms/GenerateStatementForm.jsx";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
  findById,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredStatementsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showGenerateStatementModal, setShowGenerateStatementModal] =
    useState(false);
  const [showEditStatementModal, setShowEditStatementModal] = useState(false);

  const dispatch = useDispatch();

  // access the data from redux store
  const { statementTableData } = useSelector((state) => state.statementData);
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const personID = selectedRequestData?.personId;

  const {
    data: statements,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetListOfRetirementStatementsQuery(personID);

  // handlers
  const handleEditShowStatementModal = () => {
    setShowEditStatementModal(true);
  };

  const handleGenerateStatementModalChange = () => {
    setShowGenerateStatementModal(true);
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = statements.map((item) => ({
        id: item.pensionaryID,
        RetirementStatementID: item.RetirementStatementID,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo,
        retirementStatementIssueDate: item.retirementStatementIssueDate,
        retirementStatementRunDate: item.retirementStatementRunDate,
      }));
      dispatch(setStatementTableData(data));
    }

    return () => {
      dispatch(setStatementTableData([]));
    };
  }, [isSuccess, refetch, dispatch, statements, showEditStatementModal]);

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
        accessorKey: "retirementStatementSerial",
        header: "سریال حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "retirementStatementNo",
        header: "شماره حکم",
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
        accessorKey: "editStatementAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="success" onClick={handleEditShowStatementModal}>
            <EditIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "observeStatement",
        header: "مشاهده حکم",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="primary">
            <RemoveRedEyeIcon />
          </IconButton>
        ),
      },
    ],
    []
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
      <Button
        dir="ltr"
        endIcon={<AddIcon />}
        variant="contained"
        onClick={handleGenerateStatementModalChange}
        color="primary"
        sx={{ fontFamily: "sahel" }}
      >
        <span>ایجاد</span>
      </Button>
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
    const selectedGroup = findById(statementTableData, id);

    if (id) {
      dispatch(setSelectedStatementData(selectedGroup));
    } else {
      dispatch(setSelectedStatementData([]));
    }

    return () => {
      // Cleanup function to clear selected group
      dispatch(setSelectedStatementData([]));
    };
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
          {showEditStatementModal ? (
            <Modal
              title={"حکم بازنشسته"}
              closeModal={() => setShowEditStatementModal(false)}
            >
              <RetiredStatementInfoForm />
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
