// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";
import { setItemInfo, setItemsData } from "../slices/userReqSlice";

// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function ItemsGrid() {
  const { token } = useSelector((state) => state.auth);
  const { itemsData } = useSelector((state) => state.userReq);

  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  useEffect(() => {
    if (isSuccess) {
      const data = items.itemList.map((item, i) => ({
        _id: item.id,
        name: item.itemName,
        number: i + 1,
      }));

      dispatch(setItemsData(data));
    }
  }, [items, isSuccess, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 350,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "number",
        header: "ردیف",
        size: 100,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => (
          <strong>{convertToPersianNumber(renderedCellValue)}</strong>
        ),
        align: "right",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsData,
    enableRowNumbers: true,
    muiPaginationProps: {
      color: "success",
      variant: "outlined",
      showRowsPerPage: false,
      dir: "rtl",
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
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  console.log(table.getRowModel().rows);

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedItemInfo = findById(itemsData, id);

    if (id) {
      dispatch(setItemInfo(selectedItemInfo));
    } else {
      dispatch(setItemInfo(null));
    }
  }, [dispatch, table, rowSelection, itemsData]);

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <div style={{ direction: "rtl" }}>
          <MaterialReactTable table={table} />
        </div>
      )}
    </>
  );
}

export default ItemsGrid;
