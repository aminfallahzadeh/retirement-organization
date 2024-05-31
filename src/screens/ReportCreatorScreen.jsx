// components
import ConditionSelectionForm from "../forms/ConditionSelectionForm";

function ReportCreatorScreen() {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">گزارش ساز</span>
        </h4>
      </div>

      <section className="formContainer">
        <form className="grid grid--col-3" noValidate>
          <div className="inputBox__form">
            <select className="inputBox__form--input" id="role" defaultValue="">
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="1">احکام بازنشستگان</option>
            </select>
            <label className="inputBox__form--label" htmlFor="role">
              جدول
            </label>
          </div>
        </form>
      </section>

      <ConditionSelectionForm />
    </section>
  );
  return content;
}

export default ReportCreatorScreen;
