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
import RetiredSection from "../components/RetiredSection";
import AffairsSearchPensionerForm from "../components/AffairsSearchPensionerForm";
import UserEditForm from "../components/UserEditForm";
import GetUserGroupsGrid from "../components/GetUserGroupsGrid";

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
    (state) => state.status
  );

  const { getPensionerSectionStatus } = useSelector(
    (state) => state.pensionerSection
  );

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/retirement-organization/");
    } else {
      setUserName(jwtDecode(token).name);
    }
  }, [token, navigate]);

  return (
    <div className="dashboard">
      <TopbarNav userName={userName} />
      <SidebarNav />
      <div className="dashboard__body">
        <div className="dashboard__body--pensioners">
          {getPensionerSectionStatus && (
            <>
              <AffairsSearchPensionerForm /> <RetiredSection />
            </>
          )}
        </div>

        <div className="dashboard__body--topGrid">
          {getGroupStatus && <GroupsGrid />}
          {getUserStatus && <UserGrid />}
        </div>
        <div>
          {getItemsStatus && (
            <>
              <div className="dashboard__body--input">
                <Button variant="outline-success">ذخیره</Button>
                <GroupNameInput />
              </div>

              <div className="dashboard__body--buttomGrid">
                <ItemsGrid />

                <div></div>

                {/* <ArrowButtons /> */}

                <GroupItemGrid />
              </div>
            </>
          )}

          {getUserStatus && (
            <>
              <div className="dashboard__body--input">
                <UserEditForm />
              </div>

              <div className="dashboard__body--buttomGrid">
                <GroupsGrid />

                <div></div>

                {/* <ArrowButtons /> */}

                <GetUserGroupsGrid />
              </div>

              <div className="dashboard__body--userEditButton">
                <Button variant="outline-success">ذخیره</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
