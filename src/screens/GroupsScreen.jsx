// components
import GroupsGrid from "../grids/GroupsGrid";

function GroupsScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>مدیریت گروه ها
        </h4>
      </div>

      <GroupsGrid />
    </section>
  );
}

export default GroupsScreen;
