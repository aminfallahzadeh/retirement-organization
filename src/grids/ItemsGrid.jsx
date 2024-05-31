// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";
import {
  setSelectedItemData,
  setItemsTableData,
} from "../slices/itemsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function ItemsGrid() {
  // access the data from redux store
  const { itemsTableData } = useSelector((state) => state.itemsData);
  const { groupItemsTableData } = useSelector((state) => state.groupItemsData);

  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  const {
    data: items,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetItemsQuery();

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = items.itemList.map((item) => ({
        id: item.id,
        itemName: item.itemName,
      }));

      const filteredData = data.filter(
        (a) => !groupItemsTableData.map((b) => b.id).includes(a.id)
      );

      dispatch(setItemsTableData(filteredData));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [items, isSuccess, dispatch, refetch, groupItemsTableData, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemName",
        header: "دسترسی ها",
        size: 300,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsTableData,
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
    enablePagination: false,
    muiTableContainerProps: { sx: { height: "300px" } },
    enableBottomToolbar: false,
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedItem = findById(itemsTableData, id);

    if (id && selectedItem) {
      dispatch(setSelectedItemData(selectedItem));
    } else {
      dispatch(setSelectedItemData(null));
    }
  }, [dispatch, table, rowSelection, itemsTableData]);

  return (
    <>
      {isLoading ? (
        <div className="skeleton-md">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
            width={280}
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default ItemsGrid;
