// components
import GroupsCreateUserGrid from "../grids/GroupsCreateUserGrid";

function CreateUserScreen() {
  const content = (
    <section className="main">
      <form className="formContainer grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="usrName"
          />
          <label className="inputBox__form--label" htmlFor="usrName">
            نام کاربری
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            title="لطفا یک رمز عبور معتبر وارد کنید"
            id="pssw"
          />
          <label className="inputBox__form--label" htmlFor="pssw">
            رمز عبور
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="isActive"
            style={{ cursor: "pointer" }}
            name="isActive"
            required
          >
            <option>انتخاب</option>
            <option value="true">فعال</option>
            <option value="false">غیر فعال</option>
          </select>
          <label className="inputBox__form--label" htmlFor="isActive">
            وضعیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="nam"
          />
          <label className="inputBox__form--label" htmlFor="nam">
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="namekh"
          />
          <label className="inputBox__form--label" htmlFor="namekh">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="postE"
          />
          <label className="inputBox__form--label" htmlFor="postE">
            پست الکترونیک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="sex"
            style={{ cursor: "pointer" }}
            required
          >
            <option>انتخاب</option>
            <option value="true">مرد</option>
            <option value="false">زن</option>
          </select>
          <label className="inputBox__form--label" htmlFor="sex">
            جنسیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="Tell"
          />
          <label className="inputBox__form--label" htmlFor="Tell">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="Cell"
          />
          <label className="inputBox__form--label" htmlFor="Cell">
            تلفن همراه
          </label>
        </div>
      </form>

      <GroupsCreateUserGrid />
    </section>
  );

  return content;
}

export default CreateUserScreen;
