// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";

// components
import Modal from "../components/Modal";

// mui imports
import { IconButton, Button } from "@mui/material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  RemoveRedEye as RemoveRedEyeIcon,
  Print as PrintIcon,
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
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PersonnelStatementGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [personnelStatementTableData, setPersonnelStatementTableData] =
    useState([]);

  // MODAL STATES
  const [showStatementModal, setShowStatementModal] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: statements,
    isSuccess,
    isLoading,
    error,
  } = useGetPersonnelStatementQuery({ personID });

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

  // HANDLERS
  const handleShowStatementModal = () => {
    setShowStatementModal(true);
  };

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
        accessorKey: "observeStaffStatement",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton
            color="primary"
            sx={{ padding: "0" }}
            onClick={handleShowStatementModal}
          >
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
        <>
          {showStatementModal ? (
            <Modal title="حکم" closeModal={() => setShowStatementModal(false)}>
              <div className="flex-col flex-center">
                <img src="./images/hokm-sample.png" alt="نمونه حکم" />

                <Button
                  dir="ltr"
                  endIcon={<PrintIcon />}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>چاپ</span>
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

export default PersonnelStatementGrid;
