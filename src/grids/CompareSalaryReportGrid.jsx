// react imports
import { useMemo, useState, useEffect } from "react";

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
  VisibilityOutlined as EyeIcon,
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

// components
import SlipFormTemplate from "../components/SlipFormTemplate";
import Modal from "../components/Modal";

function CompareSalaryReportGrid() {
  // TRABLE STATES
  const [rowSelection, setRowSelection] = useState({});

  // CONTROLL STATES
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [payID, setPayID] = useState(null);

  //   const { slipsTableData } = useSelector((state) => state.slipsData);

  // HANDLERS
  const handleShowSlipModal = () => {
    setShowSlipModal(true);
  };

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
        header: "شماره ملی",
        size: 20,
      },
      {
        accessorKey: "payLastName",
        header: "شماره کارمندی",
        size: 20,
      },
      {
        accessorKey: "accountNo",
        header: "نام",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payCreditAmount",
        header: "نام خانوادگی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}
          </div>
        ),
      },
      {
        accessorKey: "payDebitAmount",
        header: "ماه جاری",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}
          </div>
        ),
      },
      {
        accessorKey: "payAmount",
        header: "ماه قیل",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(separateByThousands(renderedCellValue))}
          </div>
        ),
      },
      {
        accessorKey: "payDate",
        header: "تفاوت",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payDate",
        header: "وضعیت",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: [],
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

  //   useEffect(() => {
  //     const id = Object.keys(table.getState().rowSelection)[0];

  //     if (id) {
  //       setPayID(id);
  //     } else {
  //       setPayID(null);
  //     }
  //   }, [table, rowSelection]);

  const content = (
    <>
      {showSlipModal && payID && (
        <Modal key={payID} closeModal={() => setShowSlipModal(false)}>
          <SlipFormTemplate payID={payID} />
        </Modal>
      )}
      <MaterialReactTable table={table} />
    </>
  );

  return content;
}

export default CompareSalaryReportGrid;
