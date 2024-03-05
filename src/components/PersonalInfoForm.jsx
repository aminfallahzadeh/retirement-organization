function PersonalInfoForm() {
  return (
    <form method="POST" className="PersonalInfoContainer">
      <div className="PersonalInfoContainer__gridImage">AX</div>
      <div className="PersonalInfoContainer__gridForm">
        <div className="PersonalInfoForm">
          <div className="inputBox">
            <input
              type="text"
              id="melliCode"
              className="input field input--dark"
              required
            />
            <label htmlFor="melliCode" className="label label--light">
              کد ملی (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="name"
              className="input field input--dark"
              required
            />
            <label htmlFor="name" className="label label--light">
              نام (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="surname"
              className="input field input--dark"
              required
            />
            <label htmlFor="surname" className="label label--light">
              نام خانوادگی (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="shCode"
              className="input field input--dark"
              required
            />
            <label htmlFor="shCode" className="label label--light">
              شماره شناسنامه (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="fatherName"
              className="input field input--dark"
              required
            />
            <label htmlFor="fatherName" className="label label--light">
              نام پدر
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="gender"
              className="input field input--dark"
              required
            />
            <label htmlFor="gender" className="label label--light">
              جنسیت (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="birthDate"
              className="input field input--dark"
              required
            />
            <label htmlFor="birthDate" className="label label--light">
              تاریخ تولد (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="birthPlace"
              className="input field input--dark"
              required
            />
            <label htmlFor="birthPlace" className="label label--light">
              محل تولد (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="otherName"
              className="input field input--dark"
              required
            />
            <label htmlFor="otherName" className="label label--light">
              نام و نام خانوادگی قبلی
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="retireNum"
              className="input field input--dark"
              required
            />
            <label htmlFor="retireNum" className="label label--light">
              شماره بازنشستگی
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="spouseNum"
              className="input field input--dark"
              required
            />
            <label htmlFor="spouseNum" className="label label--light">
              تعداد همسر
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="childNum"
              className="input field input--dark"
              required
            />
            <label htmlFor="childNum" className="label label--light">
              تعداد فرزند
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="staticPhone"
              className="input field input--dark"
              required
            />
            <label htmlFor="staticPhone" className="label label--light">
              تلفن ثابت
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="cellPhone"
              className="input field input--dark"
              required
            />
            <label htmlFor="cellPhone" className="label label--light">
              تلفن همراه
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="sacrStatus"
              className="input field input--dark"
              required
            />
            <label htmlFor="sacrStatus" className="label label--light">
              وضعیت ایثارگری
            </label>
          </div>

          <div className="inputBox PersonalInfoForm__colSpan2">
            <input
              type="email"
              id="email"
              className="input field input--dark"
              required
            />
            <label htmlFor="email" className="label label--light">
              پست الکترونیک
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="degree"
              className="input field input--dark"
              required
            />
            <label htmlFor="degree" className="label label--light">
              مدرک تحصیلی (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="country"
              className="input field input--dark"
              required
            />
            <label htmlFor="country" className="label label--light">
              کشور (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="region"
              className="input field input--dark"
              required
            />
            <label htmlFor="region" className="label label--light">
              استان
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="city"
              className="input field input--dark"
              required
            />
            <label htmlFor="city" className="label label--light">
              شهر
            </label>
          </div>

          <div className="inputBox PersonalInfoForm__rowColSpan2">
            <input
              type="text"
              id="address"
              className="input field input--dark"
              required
            />
            <label htmlFor="address" className="label label--light">
              نشانی
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="area"
              className="input field input--dark"
              required
            />
            <label htmlFor="area" className="label label--light">
              منطقه سکونت (<span>اجباری</span>)
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="district"
              className="input field input--dark"
              required
            />
            <label htmlFor="district" className="label label--light">
              ناحیه سکونت
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="postalCode"
              className="input field input--dark"
              required
            />
            <label htmlFor="postalCode" className="label label--light">
              کد پستی
            </label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="accom"
              className="input field input--dark"
              required
            />
            <label htmlFor="accom" className="label label--light">
              وضعیت مسکن
            </label>
          </div>
        </div>

        <div className="inputBox PersonalInfoForm__explanation">
          <input
            type="text"
            id="explanations"
            className="input field input--dark"
            required
          />
          <label htmlFor="explanations" className="label label--light">
            توضیحات
          </label>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfoForm;
