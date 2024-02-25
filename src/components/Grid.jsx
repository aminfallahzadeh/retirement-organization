// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";

// library imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function Grid() {
  const [gridData, setGridData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { data: groups, isLoading, isSuccess } = useGetGroupQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setGridData([]);
    console.log(groups);
    if (isSuccess) {
      groups.map((group, i) => {
        setGridData((prev) => [...prev, { name: group.groupName, age: i + 1 }]);
      });
    }
  }, [groups, isSuccess]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "نام گروه",
        muiTableHeadCellProps: { sx: { color: "green" }, align: "right" }, //custom props
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
        align: "right",
      },
      {
        accessorFn: (row) => row.age, //alternate way
        muiTableHeadCellProps: { sx: { color: "green" }, align: "right" }, //custom props
        muiTableBodyCellProps: {
          align: "right",
        },
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        Header: <i style={{ color: "red" }}>ردیف</i>, //optional custom markup
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
      {isLoading ? <h1>Loading ...</h1> : <MaterialReactTable table={table} />}
    </>
  );
}

export default Grid;
