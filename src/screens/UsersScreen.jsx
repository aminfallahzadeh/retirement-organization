// components
import UsersGrid from "../grids/UsersGrid";

function UsersScreen() {
  return (
    <div className="main">
      <div className="dashboard__body--topGrid">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline"></span>مدیریت کاربران
          </h4>
        </div>

        <UsersGrid />
      </div>
    </div>
  );
}

export default UsersScreen;
