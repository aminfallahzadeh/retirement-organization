// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// redux imports
import { useSelector } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupItemGrid() {
  const [groupItemsData, setGroupItemsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { data: groupItems, isLoading } = useGetGroupItemsQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setGroupItemsData([]);
    try {
      groupItems.itemList.map((item, i) => {
        setGroupItemsData((prev) => [
          ...prev,
          { name: item.itemID, number: convertToPersianNumber(i + 1) },
        ]);
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
    // if (isSuccess) {
    //   groupItems.itemList.map((item, i) => {
    //     setGroupItemsData((prev) => [
    //       ...prev,
    //       { name: item.itemID, number: convertToPersianNumber(i + 1) },
    //     ]);
    //   });
    // }
  }, [groupItems]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام",
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
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: groupItemsData,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    initialState: { pagination: { pageSize: 5 } },
    muiPaginationProps: {
      color: "success",
      shape: "rounded",
      rowsPerPageOptions: [5, 10, 20],
      variant: "outlined",
    },
  });

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

export default GroupItemGrid;
