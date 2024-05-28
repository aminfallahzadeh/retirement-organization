// components
import UsersGrid from "../grids/UsersGrid";

function UsersScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>مدیریت کاربران
        </h4>
      </div>

      <UsersGrid />
    </section>
  );
}

export default UsersScreen;
