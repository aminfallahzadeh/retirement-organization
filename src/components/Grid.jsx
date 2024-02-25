// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";

// library imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function Grid() {
  const [data, setData] = useState([]);
  const { getGroupData, getGroupStatus } = useSelector(
    (state) => state.userReq
  );

  useEffect(() => {
    if (getGroupStatus) {
      getGroupData.map((name, i) => {
        setData((prev) => [...prev, { name: name.groupName, age: i + 1 }]);
      });
    } else {
      setData([]);
    }
  }, [getGroupData, getGroupStatus]);

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
    data,
    columns,
  });
  return <MaterialReactTable table={table} />;
}

export default Grid;
