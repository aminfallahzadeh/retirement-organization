// components
import ItemsGrid from "../components/ItemsGrid";
import UserButton from "../components/UserButton";

function CreateGroupScreen() {
  return (
    <section className="main">
      <div className="main--title">
        <h4>نام گروه را وارد کنید</h4>
        <hr />
      </div>

      <div className="main--rflex">
        <form className="inputBox ">
          <input
            type="text"
            className="input field input--dark"
            required
            id="groupName"
          />
          <label className="label" htmlFor="groupName">
            نام گروه
          </label>
        </form>
        <div>
          <UserButton variant={"outline-success"}>ذخیره</UserButton>
        </div>
      </div>

      <div className="main--title">
        <h4>آیتم های گروه را انتخاب کنید</h4>
        <hr />
      </div>

      <ItemsGrid />
    </section>
  );
}

export default CreateGroupScreen;
