// library imports
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";

// component imports
import GroupsGrid from "../components/GroupsGrid";
import UserGrid from "../components/UserGrid";
import SidebarNav from "../components/SidebarNav";
import TopbarNav from "../components/TopbarNav";
import ItemsGrid from "../components/ItemsGrid";
import GroupItemGrid from "../components/GroupItemGrid";
import GroupNameInput from "../components/GroupNameInput";
import ArrowButtons from "../components/ArrowButtons";
import GridTemplate from "../components/GridTemplate";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// react imports
import { useEffect, useState } from "react";

function Dashboard() {
  // get username from userInfo
  const [userName, setUserName] = useState("");

  const { getGroupStatus, getUserStatus, getItemsStatus } = useSelector(
    (state) => state.userReq
  );

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
    <div className="dashboard">
      <TopbarNav userName={userName} />
      <SidebarNav />
      <div className="dashboard__body">
        <div className="dashboard__body--topGrid">
          {getGroupStatus ? (
            <GroupsGrid />
          ) : getUserStatus ? (
            <UserGrid />
          ) : null}
        </div>
        <div>
          {getItemsStatus && (
            <>
              <div className="dashboard__body--input">
                <Button variant="outline-success">ذخیره</Button>
                <GroupNameInput />
              </div>

              <div className="dashboard__body--buttomGrid">
                <GroupItemGrid />

                <ArrowButtons />

                <ItemsGrid />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
