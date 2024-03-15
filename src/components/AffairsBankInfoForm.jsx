function AffairsBankInfoForm() {
  return (
    <form method="POST" className="grid grid--col-3 formContainer " noValidate>
      <div className="inputBox__form">
        <input
          type="text"
          id="bank"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="bank" className="inputBox__form--label">
          بانک
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="branch"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="branch" className="inputBox__form--label">
          شعبه
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="account"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="account" className="inputBox__form--label">
          حساب
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="office"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="office" className="inputBox__form--label">
          دفتر کل
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="insurance1"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="insurance1" className="inputBox__form--label">
          ضریب بیمه
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="insurance2"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="insurance2" className="inputBox__form--label">
          بیمه تبعی
        </label>
      </div>
    </form>
  );
}

export default AffairsBankInfoForm;
