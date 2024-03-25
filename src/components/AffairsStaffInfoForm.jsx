function AffairsStaffInfoForm() {
  const content = (
    <form method="POST" className="grid grid--col-3 formContainer" noValidate>
      <div className="inputBox__form">
        <input
          type="text"
          id="group"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="group" className="inputBox__form--label">
          <span>*</span> گروه
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="military"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="military" className="inputBox__form--label">
          <span>*</span> آخرین محل خدمت
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="position"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="position" className="inputBox__form--label">
          <span>*</span> سمت
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="type"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="type" className="inputBox__form--label">
          <span>*</span> نوع استخدام
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="retireDate"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="retireDate" className="inputBox__form--label">
          <span>*</span> تاریخ بازنشستگی
        </label>
      </div>

      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="condition"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="condition" className="inputBox__form--label">
          وضعیت
        </label>
      </div>

      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="manager"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="manager" className="inputBox__form--label">
          ضریب مدیریتی
        </label>
      </div>
      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="realDuration"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="realDuration" className="inputBox__form--label">
          سابقه حقیقی بازنشسته
        </label>
      </div>
      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="grantDuration"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="grantDuration" className="inputBox__form--label">
          سابقه ارفاقی بازنشسته
        </label>
      </div>
    </form>
  );
  return content;
}

export default AffairsStaffInfoForm;
