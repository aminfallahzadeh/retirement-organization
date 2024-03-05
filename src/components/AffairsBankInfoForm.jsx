function AffairsBankInfoForm() {
  return (
    <form method="POST" className="BankInfoForm">
      <div className="inputBox">
        <input
          type="text"
          id="bank"
          className="input field input--dark"
          required
        />
        <label htmlFor="bank" className="label label--light">
          بانک
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="branch"
          className="input field input--dark"
          required
        />
        <label htmlFor="branch" className="label label--light">
          شعبه
        </label>
      </div>
      <div className="inputBox">
        <input
          type="text"
          id="account"
          className="input field input--dark"
          required
        />
        <label htmlFor="account" className="label label--light">
          حساب
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="office"
          className="input field input--dark"
          required
        />
        <label htmlFor="office" className="label label--light">
          دفتر کل
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="insurance1"
          className="input field input--dark"
          required
        />
        <label htmlFor="insurance1" className="label label--light">
          ضریب بیمه
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="insurance2"
          className="input field input--dark"
          required
        />
        <label htmlFor="insurance2" className="label label--light">
          بیمه تبعی
        </label>
      </div>
      <div className="inputBox BankInfoForm__large">
        <input
          type="text"
          id="exp"
          className="input field input--dark"
          required
        />
        <label htmlFor="exp" className="label label--light ">
          توضیح
        </label>
      </div>
      <div className="inputBox">
        <input
          type="text"
          id="cityBank"
          className="input field input--dark"
          required
        />
        <label htmlFor="cityBank" className="label label--light">
          شماره حساب بانک شهر
        </label>
      </div>
    </form>
  );
}

export default AffairsBankInfoForm;
