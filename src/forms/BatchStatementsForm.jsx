// componsnets
import StatementItemsGrid from "../grids/StatementItemsGrid";

function BatchStatementsForm() {
  return (
    <section className="formContainer">
      <h4 className="title-primary">احکام گروهی</h4>
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form">
          <input
            type="text"
            id="year"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="year" className="inputBox__form--label">
            <span>*</span> سال
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="sazman"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="sazman" className="inputBox__form--label">
            <span>*</span> سازمان
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="sexG"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="sexG" className="inputBox__form--label">
            <span>*</span> جنسیت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="runTime"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="runTime" className="inputBox__form--label">
            <span>*</span> تاریخ اجرا
          </label>
        </div>

        <div className="inputBox__form col-span-2">
          <input
            type="text"
            id="statementType"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="statementType" className="inputBox__form--label">
            <span>*</span> نوع حکم
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="confirmDate"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="confirmDate" className="inputBox__form--label">
            <span>*</span> تاریخ تایید
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="monthNum"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="monthNum" className="inputBox__form--label">
            <span>*</span> تعداد ماه برای محاسبه تفاوت
          </label>
        </div>
      </form>

      <div className="u-margin-top-md flex-row flex-row--grow">
        <StatementItemsGrid />

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="StatemnetDisc"
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="StatemnetDisc" className="inputBox__form--label">
            شرح حکم
          </label>
        </div>
      </div>
    </section>
  );
}

export default BatchStatementsForm;
