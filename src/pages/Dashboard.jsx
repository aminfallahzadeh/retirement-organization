// component imports
import UserButton from "../components/UserButton";
import GroupsGridUserScreen from "../components/GroupsGridUserScreen";
import ItemsGrid from "../components/ItemsGrid";
import GroupItemGrid from "../components/GroupItemGrid";
import ArrowButtons from "../components/ArrowButtons";
import UserGroupsGrid from "../components/UserGroupsGrid";
import CartableGrid from "../components/CartableGrid";

// redux imports
import { useSelector, useDispatch } from "react-redux";

// react imports
import { useEffect } from "react";
import { setGetCartableStatus } from "../slices/statusSlice";

function Dashboard() {
  const { getCartableStatus, getItemsStatus, getUserGroupsStatus } =
    useSelector((state) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGetCartableStatus(true));
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <div className="dashboard__body--pensioners">
          {getCartableStatus && <CartableGrid />}
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
              <div className="dashboard__body--buttomGrid">
                <GroupsGridUserScreen />

                <div></div>
                {/* <ArrowButtons /> */}

                <UserGroupsGrid />
              </div>
              <UserButton variant={"success"}>ذخیره</UserButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
