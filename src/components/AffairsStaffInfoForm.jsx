function AffairsStaffInfoForm() {
  return (
    <form method="POST" className="StaffInfoForm">
      <div className="inputBox">
        <input
          type="text"
          id="personalCode"
          className="input field input--dark"
          required
        />
        <label htmlFor="personalCode" className="label label--light">
          کد ملی (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="group"
          className="input field input--dark"
          required
        />
        <label htmlFor="group" className="label label--light">
          گروه (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="military"
          className="input field input--dark"
          required
        />
        <label htmlFor="military" className="label label--light">
          آخرین محل خدمت (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="position"
          className="input field input--dark"
          required
        />
        <label htmlFor="position" className="label label--light">
          سمت (<span>اجباری</span>)
        </label>
      </div>
      <div className="inputBox">
        <input
          type="text"
          id="type"
          className="input field input--dark"
          required
        />
        <label htmlFor="type" className="label label--light">
          نوع استخدام (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="docs"
          className="input field input--dark"
          required
        />
        <label htmlFor="docs" className="label label--light">
          مستند بازنشستگی (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="retireDate"
          className="input field input--dark"
          required
        />
        <label htmlFor="retireDate" className="label label--light">
          تاریخ بازنشستگی (<span>اجباری</span>)
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="deathDate"
          className="input field input--dark"
          required
        />
        <label htmlFor="deathDate" className="label label--light">
          تاریخ فوت
        </label>
      </div>

      <div className="StaffInfoForm__flex">
        <div className="inputBox StaffInfoForm__flex--item">
          <input
            type="text"
            id="condition"
            className="input field input--dark"
            required
          />
          <label htmlFor="condition" className="label label--light">
            وضعیت
          </label>
        </div>

        <div className="inputBox StaffInfoForm__flex--item">
          <input
            type="text"
            id="manager"
            className="input field input--dark"
            required
          />
          <label htmlFor="manager" className="label label--light">
            ضریب مدیریتی
          </label>
        </div>
      </div>

      <div className="inputBox">
        <input
          type="text"
          id="marrage"
          className="input field input--dark"
          required
        />
        <label htmlFor="marrage" className="label label--light">
          وضعیت تاهل (<span>اجباری</span>)
        </label>
      </div>

      <div className="StaffInfoForm__box">
        <div className="StaffInfoForm__box--item">
          <input type="checkbox" id="marriageRight" />
          <label htmlFor="marriageRight" className="StaffInfoForm__box--label">
            حق تاهل
          </label>
        </div>

        <div className="StaffInfoForm__box--item">
          <input type="checkbox" id="childRight" />
          <label htmlFor="childRight" className="StaffInfoForm__box--label">
            حق اولاد
          </label>
        </div>
      </div>
    </form>
  );
}

export default AffairsStaffInfoForm;
