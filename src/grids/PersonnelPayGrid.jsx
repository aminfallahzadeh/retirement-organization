// REACT IMPORTS
import { useMemo, useState, useCallback } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetFinancialItemsQuery } from "../slices/financialItemApiSlice.js";
import { setFinancialTableData } from "../slices/financialDataSlice.js";

// COMPONENTS
import Modal from "../components/Modal";

// MUI
import {
  IconButton,
  PaginationItem,
  Tooltip,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function PersonnelPayGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { personTableData } = useSelector((state) => state.personData);

  const dispatch = useDispatch();

  // ACCESS QUERIES
  const [getFinancialItems, { isLoading, isFetching }] =
    useLazyGetFinancialItemsQuery();

  // HANDLERS
  const handleGetFinancialItems = useCallback(
    async (personID) => {
      try {
        const res = await getFinancialItems(personID).unwrap();
        console.log(res);
        const mappedData = res.itemList.map((item, index) => ({
          id: item.financialItemID,
          financialItemRowNum: index + 1,
          payItemTypeID: item.payItemTypeID || "-",
          payItemTypeName: item.payItemTypeName || "-",
        }));
        dispatch(setFinancialTableData(mappedData));
      } catch (error) {
        console.log(error);
      }
    },
    [getFinancialItems, dispatch]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "personRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
        size: 20,

        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "personnelID",
        header: "شماره کارمندی",
        size: 20,

        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "observeStaff",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title="مشاهده آیتمها">
            <IconButton
              color="primary"
              sx={{ padding: "0" }}
              onClick={() => handleGetFinancialItems(row.original.id)}
            >
              <EyeIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [handleGetFinancialItems]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: personTableData,
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = (
    <>
      {isLoading || isFetching ? (
        <Modal title={"در حال ایجاد گزارش"}>
          <p className="paragraph-primary" style={{ textAlign: "center" }}>
            لطفا منتظر بمانید...
          </p>
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
  );
  return content;
}

export default PersonnelPayGrid;
