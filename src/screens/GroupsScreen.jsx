// components
import GroupsGrid from "../components/GroupsGrid";
import ItemsGrid from "../components/ItemsGrid";
import GroupItemGrid from "../components/GroupItemGrid";
import ArrowButtons from "../components/ArrowButtons";
import UserButton from "../components/UserButton";

// redux imports
import { useSelector } from "react-redux";

function GroupsScreen() {
  const { getItemsStatus } = useSelector((state) => state.status);

  return (
    <div className="main">
      <div className="dashboard__body--topGrid">
        <GroupsGrid />
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
      </div>
    </div>
  );
}

export default GroupsScreen;
