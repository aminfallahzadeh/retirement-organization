// library imports
import { jwtDecode } from "jwt-decode";

// component imports
import UserButton from "../components/UserButton";
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
import UserGroupsGrid from "../components/UserGroupsGrid";
import CartableGrid from "../components/CartableGrid";
import RetiredInfoSection from "../components/RetiredInfoSection";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";

// react imports
import { useEffect, useState } from "react";
import { setGetCartableStatus } from "../slices/statusSlice";

function Dashboard() {
  // get username from userInfo
  const [userName, setUserName] = useState("");

  const {
    getCartableStatus,
    getGroupStatus,
    getUserStatus,
    getItemsStatus,
    getUserGroupsStatus,
    getPensionerSectionStatus,
  } = useSelector((state) => state.status);

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/retirement-organization/");
    } else {
      setUserName(jwtDecode(token).name);
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(setGetCartableStatus(true));
  }, [dispatch]);

  return (
    <div className="dashboard">
      <TopbarNav userName={userName} />
      <SidebarNav />
      <div className="dashboard__body">
        <div className="dashboard__body--pensioners">
          {getCartableStatus && <CartableGrid />}

          {getPensionerSectionStatus && (
            <>
              <AffairsSearchPensionerForm />
              <RetiredSection />
              <RetiredInfoSection />
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
              <div className="dashboard__body--buttomGrid">
                <ItemsGrid />

                <ArrowButtons />

                <GroupItemGrid />
              </div>
              <UserButton variant={"success"}>ذخیره</UserButton>
            </>
          )}

          {getUserGroupsStatus && (
            <>
              <div className="dashboard__body--input">
                <UserEditForm />
              </div>

              <div className="dashboard__body--buttomGrid">
                <GroupsGrid />

                <div></div>

                {/* <ArrowButtons /> */}

                <UserGroupsGrid />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
