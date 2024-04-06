// components
import UsersGrid from "../grids/UsersGrid";

function UsersScreen() {
  return (
    <div className="main">
      <div className="dashboard__body--topGrid">
        <h4 className="title-primary u-margin-bottom-md">مدیریت کاربران</h4>
        <UsersGrid />
      </div>
    </div>
  );
}

export default UsersScreen;
