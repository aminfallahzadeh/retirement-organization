// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";
import {
  setGroupItemsTableData,
  setSelectedGroupItemData,
} from "../slices/groupItemsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupItemGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  // access selected row info
  const { selectedGroupData } = useSelector((state) => state.groupsData);
  const { token } = useSelector((state) => state.auth);

  // access the data from redux store
  const { groupItemsTableData } = useSelector((state) => state.groupItemsData);

  // fetch data from the API
  const {
    data: groupItems,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetGroupItemsQuery({ token, groupId: selectedGroupData?.id });

  // trigger the fetch
  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groupItems.itemList.map((item) => ({
        id: item.itemID,
        name: item.itemName,
      }));

      dispatch(setGroupItemsTableData(data));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [groupItems, isSuccess, dispatch, refetch, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: (
          <span>
            دسترسی های گروه:{" "}
            <span style={{ fontStyle: "italic", color: "#03620a" }}>
              {selectedGroupData?.name}
            </span>
          </span>
        ),
        size: 300,
      },
    ],
    [selectedGroupData?.name]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupItemsTableData,
    positionGlobalFilter: "left",
    enablePagination: false,
    muiTableContainerProps: { sx: { height: "300px" } },
    enableBottomToolbar: false,
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroupItem = findById(groupItemsTableData, id);

    if (id && selectedGroupItem) {
      dispatch(setSelectedGroupItemData(selectedGroupItem));
    } else {
      dispatch(setSelectedGroupItemData(null));
    }
  }, [dispatch, table, rowSelection, groupItemsTableData]);

  const content = (
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

  return content;
}

export default GroupItemGrid;
