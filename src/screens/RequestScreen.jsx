// redux imports
import { useSelector } from "react-redux";

// helpers
import { findById } from "../helper.js";

// rrd imports
import { useLocation } from "react-router-dom";

function RequestScreen() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const { requestTableData } = useSelector((state) => state.requestsData);

  const body = findById(requestTableData, id).body;

  return <div className="main">{body}</div>;
}

export default RequestScreen;
