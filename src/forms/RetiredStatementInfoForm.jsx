function RetiredStatementInfoForm() {
  return (
    <section className="formContainer">
      <form method="POST" className="RetiredHokmInfoModalFormA">
        <div className="inputBox">
          <input
            type="text"
            id="melliCodeFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="melliCodeFormA" className="label label--light">
            <span>*</span> شماره ملی
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="nameFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="nameFormA" className="label label--light">
            نام
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="fnameFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="fnameFormA" className="label label--light">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="shNumFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="shNumFormA" className="label label--light">
            شماره شناسنامه
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="fatherNameFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="fatherNameFormA" className="label label--light">
            نام پدر
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="birthDateFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="birthDateFormA" className="label label--light">
            تاریخ تولد
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="birthPalceFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="birthPalceFormA" className="label label--light">
            محل تولد
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="genderFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="genderFormA" className="label label--light">
            جنسیت
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="marriageFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="marriageFormA" className="label label--light">
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="retiredNumFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="retiredNumFormA" className="label label--light">
            شماره بازنشستگی
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="degreeFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="degreeFormA" className="label label--light">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="treatmentCodeFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="treatmentCodeFormA" className="label label--light">
            کد درمانی
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="jobTitleFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="jobTitleFormA" className="label label--light">
            عنوان شغل
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="rateFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="rateFormA" className="label label--light">
            مرتبه
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="postalCodeFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="postalCodeFormA" className="label label--light">
            کد پستی
          </label>
        </div>

        <div className="RetiredHokmInfoModalFormA__rowSpan3">
          <h4>وضعیت ایثارگری</h4>

          <div className="RetiredHokmInfoModalFormA__rowSpan3--box">
            <div>
              <input type="checkbox" id="shahidFamilyFormA" />
              <label
                htmlFor="shahidFamilyFormA"
                className="StaffInfoForm__box--label"
              >
                خانواده شهید
              </label>
            </div>

            <div>
              <input type="checkbox" id="razmandeFormA" />
              <label
                htmlFor="razmandeFormA"
                className="StaffInfoForm__box--label"
              >
                رزمنده
              </label>
            </div>

            <div>
              <input type="checkbox" id="shahidChildrenFormA" />
              <label
                htmlFor="shahidChildrenFormA"
                className="StaffInfoForm__box--label"
              >
                فرزند شهید
              </label>
            </div>

            <div>
              <input type="checkbox" id="janbazFormA" />
              <label
                htmlFor="janbazFormA"
                className="StaffInfoForm__box--label"
              >
                جانباز
              </label>
            </div>

            <div>
              <input type="checkbox" id="shahidFormA" />
              <label
                htmlFor="shahidFormA"
                className="StaffInfoForm__box--label"
              >
                شهید
              </label>
            </div>

            <div>
              <input type="checkbox" id="azadehFormA" />
              <label
                htmlFor="azadehFormA"
                className="StaffInfoForm__box--label"
              >
                آزاده
              </label>
            </div>
          </div>
        </div>

        <div className="RetiredHokmInfoModalFormA__twoInputs">
          <div className="inputBox">
            <input
              type="text"
              id="childNumFormA"
              className="input field input--dark"
              required
            />
            <label htmlFor="childNumFormA" className="label label--light">
              تعداد فرزند
            </label>
          </div>
          <div className="inputBox">
            <input
              type="text"
              id="groupFormA"
              className="input field input--dark"
              required
            />
            <label htmlFor="groupFormA" className="label label--light">
              گروه
            </label>
          </div>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="retiredDateFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="retiredDateFormA" className="label label--light">
            تاریخ بازنشستگی
          </label>
        </div>

        <div className="inputBox RetiredHokmInfoModalFormA__colSpan2">
          <input
            type="text"
            id="lastMilitaryPlaceFormA"
            className="input field input--dark"
            required
          />
          <label
            htmlFor="lastMilitaryPlaceFormA"
            className="label label--light"
          >
            آخرین محل خدمت
          </label>
        </div>

        <div className="inputBox RetiredHokmInfoModalFormA__colSpan2">
          <input
            type="text"
            id="lastPostFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="lastPostFormA" className="label label--light">
            آخرین پست سازمانی
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="realSanavatFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="realSanavatFormA" className="label label--light">
            سنوات خدمت واقعی
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="erfaghSanavatFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="erfaghSanavatFormA" className="label label--light">
            سنوات ارفاقی
          </label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            id="retiredSanavatFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="retiredSanavatFormA" className="label label--light">
            سنوات بازنشستگی
          </label>
        </div>

        <div className="inputBox RetiredHokmInfoModalFormA__colSpan2">
          <input
            type="text"
            id="maskanRightFormA"
            className="input field input--dark"
            required
          />
          <label htmlFor="maskanRightFormA" className="label label--light">
            یارانه حق مسکن
          </label>
        </div>
      </form>
    </section>
  );
}

export default RetiredStatementInfoForm;
