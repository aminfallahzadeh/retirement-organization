// react imports
import { useMemo } from "react";

function useCreateColumns() {
  const columns = useMemo(() => [], []);
  return columns;
}

export default useCreateColumns;
