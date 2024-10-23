// REACT IMPORTS
import { useMemo } from "react";

const useCreateGridColumns = (data) => {
  const columns = useMemo(
    () =>
      data.map((item) => ({
        accessorKey: item.accessorKey,
        header: item.header,
        Cell: (info) => info.row.original[item.accessorKey],
      })),
    [data]
  );

  return columns;
};

export default useCreateGridColumns;
