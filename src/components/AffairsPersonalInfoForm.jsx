// library imports
import { UserIcon } from "@heroicons/react/24/outline";

function AffairsPersonalInfoForm() {
  const content = (
    <form method="POST" className="grid grid--col-3 formContainer" noValidate>
      <div className="row-span-2 flex-col-2 flex-col-2--grow-second">
        <div className="formPic">
          <UserIcon width={40} />
        </div>

        <div className="flex-row-2 flex-center flex-row-2--grow">
          <div className="inputBox__form">
            <input
              type="text"
              id="name"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="name" className="inputBox__form--label">
              <span>*</span> نام
            </label>
          </div>
          <div className="inputBox__form">
            <input
              type="text"
              id="surname"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="surname" className="inputBox__form--label">
              <span>*</span> نام خانوادگی
            </label>
          </div>
        </div>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="melliCode"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="melliCode" className="inputBox__form--label">
          <span>*</span> کد ملی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="shCode"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="shCode" className="inputBox__form--label">
          <span>*</span> شماره شناسنامه
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="fatherName"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="fatherName" className="inputBox__form--label">
          نام پدر
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="gender"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="gender" className="inputBox__form--label">
          <span>*</span> جنسیت
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="birthDate"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="birthDate" className="inputBox__form--label">
          <span>*</span> تاریخ تولد
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="birthPlace"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="birthPlace" className="inputBox__form--label">
          <span>*</span> محل تولد
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="otherName"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="otherName" className="inputBox__form--label">
          نام و نام خانوادگی قبلی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="retireNum"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="retireNum" className="inputBox__form--label">
          شماره بازنشستگی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="staticPhone"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="staticPhone" className="inputBox__form--label">
          تلفن ثابت
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="cellPhone"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="cellPhone" className="inputBox__form--label">
          تلفن همراه
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="childNum"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="childNum" className="inputBox__form--label">
          تلفن پشتیبان
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="childNum"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="childNum" className="inputBox__form--label">
          نام و نام خانوادگی پشتیبان
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="sacrStatus"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="sacrStatus" className="inputBox__form--label">
          وضعیت ایثارگری
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="text"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="email" className="inputBox__form--label">
          پست الکترونیک
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="degree"
          className="inputBox__form--input field"
          required
        />
        <label htmlFor="degree" className="inputBox__form--label">
          <span>*</span> مدرک تحصیلی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="country"
          className="inputBox__form--input field"
          required
        />
        <label htmlFor="country" className="inputBox__form--label">
          <span>*</span> کشور
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="region"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="region" className="inputBox__form--label">
          استان
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="city"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="city" className="inputBox__form--label">
          شهر
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="area"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="area" className="inputBox__form--label">
          <span>*</span> منطقه سکونت
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="district"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="district" className="inputBox__form--label">
          ناحیه سکونت
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="postalCode"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="postalCode" className="inputBox__form--label">
          کد پستی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="accom"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="accom" className="inputBox__form--label">
          وضعیت مسکن
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="marrageCond"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="marrageCond" className="inputBox__form--label">
          وضعیت تاهل
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="deathDate"
          className="inputBox__form--input"
          required
        />
        <label htmlFor="deathDate" className="inputBox__form--label">
          تاریخ فوت
        </label>
      </div>
      <div className="inputBox__form col-span-3">
        <textarea
          type="text"
          id="address"
          className="inputBox__form--input"
          required
        ></textarea>
        <label htmlFor="address" className="inputBox__form--label">
          نشانی
        </label>
      </div>

      <div className="inputBox__form row-col-span-3">
        <textarea
          type="text"
          id="explanations"
          className="inputBox__form--input"
          required
        ></textarea>
        <label htmlFor="explanations" className="inputBox__form--label">
          توضیحات
        </label>
      </div>
    </form>
  );
  return content;
}

export default AffairsPersonalInfoForm;
