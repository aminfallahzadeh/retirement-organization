// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";
import { setItemInfo, setItemsData } from "../slices/userReqSlice";

// mui imports
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

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
  const refreshTokenHandler = useRefreshToken();

  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  useEffect(() => {
    if (isSuccess) {
      const data = items.itemList.map((item) => ({
        _id: item.id,
        name: item.itemName,
      }));

      dispatch(setItemsData(data));
    }
  }, [items, isSuccess, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام آیتم",
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
        accessorKey: "deleteAction",
        header: "اضافه کردن",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="success">
            <AddIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsData,
    positionGlobalFilter: "left",
    initialState: {
      density: "compact",
      showGlobalFilter: true,
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
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedItemInfo = findById(itemsData, id);

    if (id) {
      dispatch(setItemInfo(selectedItemInfo));
    } else {
      dispatch(setItemInfo(null));
    }
  }, [dispatch, table, rowSelection, itemsData]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default ItemsGrid;
