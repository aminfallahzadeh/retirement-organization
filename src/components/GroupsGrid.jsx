// react imports
import { useMemo, useState, useEffect } from "react";

// bootstrap imports
import { Button } from "react-bootstrap";

// redux imports
import { useSelector } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGrid() {
  const [gridData, setGridData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { data: groups, isLoading, isSuccess } = useGetGroupQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setGridData([]);
    if (isSuccess) {
      groups.map((group, i) => {
        setGridData((prev) => [
          ...prev,
          { name: group.groupName, number: i + 1 },
        ]);
      });
    }
  }, [groups, isSuccess]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
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
    data: gridData,
    columns,
  });

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <>
          <MaterialReactTable table={table} />

          <div className="double-buttons">
            <Button>ویرایش</Button>
            <Button>ایجاد گروه</Button>
          </div>
        </>
      )}
    </>
  );
}

export default GroupsGrid;
