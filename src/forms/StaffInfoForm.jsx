function StaffInfoForm() {
  const content = (
    <section className="formContainer">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffNationalCode"
          />
          <label className="inputBox__form--label" htmlFor="staffNationalCode">
            کد ملی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffNO"
          />
          <label className="inputBox__form--label" htmlFor="staffNO">
            شماره کارمندی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffName"
          />
          <label className="inputBox__form--label" htmlFor="staffName">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffFamilyName"
          />
          <label className="inputBox__form--label" htmlFor="staffFamilyName">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffCode"
          />
          <label className="inputBox__form--label" htmlFor="staffCode">
            شماره سناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffFatherName"
          />
          <label className="inputBox__form--label" htmlFor="staffFatherName">
            نام پدر
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffBirthDate"
          />
          <label className="inputBox__form--label" htmlFor="staffBirthDate">
            تاریخ تولد
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffBirthPlace"
          />
          <label className="inputBox__form--label" htmlFor="staffBirthPlace">
            محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffGender"
          />
          <label className="inputBox__form--label" htmlFor="staffGender">
            جنسیت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffMaritialStatus"
          />
          <label
            className="inputBox__form--label"
            htmlFor="staffMaritialStatus"
          >
            وضعیت تاهل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffDegree"
          />
          <label className="inputBox__form--label" htmlFor="staffDegree">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="staffMilitaryEntrance"
          />
          <label
            className="inputBox__form--label"
            htmlFor="staffMilitaryEntrance"
          >
            ورود به خدمت
          </label>
        </div>
      </form>
    </section>
  );

  return content;
}

export default StaffInfoForm;
