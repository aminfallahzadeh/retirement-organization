// library imports
import { jwtDecode } from "jwt-decode";

// component imports
import Grid from "../components/Grid";
import SidebarNav from "../components/SidebarNav";
import TopbarNav from "../components/TopbarNav";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// react imports
import { useEffect, useState } from "react";

function Dashboard() {
  // get username from userInfo
  const [userName, setUserName] = useState("");

  const { getGroupStatus } = useSelector((state) => state.userReq);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/retirement-organization/");
    } else {
      setUserName(jwtDecode(userInfo.itemList[0].token).name);
    }
  }, [userInfo, navigate]);

  return (
    <main className="dashboard-body">
      <TopbarNav userName={userName} />
      <SidebarNav />
      {getGroupStatus && <Grid />}
    </main>
  );
}

export default Dashboard;
