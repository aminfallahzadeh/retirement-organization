// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// bootstrap imports
import { Button } from "react-bootstrap";

// redux imports
import { useSelector } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";

// library imports
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { MaterialReactTable } from "material-react-table";

function GroupsGrid() {
  const [gridData, setGridData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { data: groups, isLoading, isSuccess } = useGetGroupQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setGridData([]);
    if (isSuccess) {
      groups.itemList.map((group, i) => {
        setGridData((prev) => [
          ...prev,
          { name: group.groupName, number: convertToPersianNumber(i + 1) },
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

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <>
          <MaterialReactTable
            columns={columns}
            data={gridData}
            enableColumnFilterModes
            columnResizeDirection="rtl"
            localization={MRT_Localization_FA}
          />

          <div className="double-buttons">
            <Button variant="outline-success">ویرایش</Button>
            <Button variant="outline-success">ایجاد گروه</Button>
          </div>
        </>
      )}
    </>
  );
}

export default GroupsGrid;
