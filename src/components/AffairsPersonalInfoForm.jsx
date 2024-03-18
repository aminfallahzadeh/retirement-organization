// react imports
import { useState, useEffect } from "react";

// mui imports
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material";

function AffairsPersonalInfoForm({ retiredData }) {
  const [personObject, setPersonObject] = useState(retiredData);

  useEffect(() => {
    setPersonObject(retiredData);
  }, [retiredData]);

  useEffect(() => {
    console.log(personObject);
  }, [personObject]);

  const handlePersonObjectChange = (e) => {
    const { name, value } = e.target;
    setPersonObject({ ...personObject, [name]: value });
  };

  const content = (
    <form method="POST" className="grid grid--col-3 formContainer" noValidate>
      <div className="row-span-2 flex-row flex-row--grow-second">
        <div className="formPic">
          <PersonOutlinedIcon />
        </div>

        <div className="flex-col flex-center flex-col--grow">
          <div className="inputBox__form">
            <input
              type="text"
              name="personFirstName"
              id="name"
              className="inputBox__form--input"
              value={personObject?.personFirstName || ""}
              onChange={handlePersonObjectChange}
              required
            />
            <label htmlFor="name" className="inputBox__form--label">
              <span>*</span> نام
            </label>
          </div>
          <div className="inputBox__form">
            <input
              type="text"
              name="personLastName"
              id="surname"
              className="inputBox__form--input"
              value={personObject?.personLastName || ""}
              onChange={handlePersonObjectChange}
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
          name="personNationalCode"
          id="melliCode"
          className="inputBox__form--input"
          value={personObject?.personNationalCode || ""}
          onChange={handlePersonObjectChange}
          required
        />
        <label htmlFor="melliCode" className="inputBox__form--label">
          <span>*</span> کد ملی
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          name="personCertificatetNo"
          id="shCode"
          className="inputBox__form--input"
          value={personObject?.personCertificatetNo || ""}
          onChange={handlePersonObjectChange}
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
          name="personFatherName"
          className="inputBox__form--input"
          value={personObject?.personFatherName || ""}
          onChange={handlePersonObjectChange}
          required
        />
        <label htmlFor="fatherName" className="inputBox__form--label">
          نام پدر
        </label>
      </div>

      <div className="inputBox__form">
        <select
          type="text"
          name="genderID"
          id="gender"
          className="inputBox__form--input"
          value={personObject?.genderID || 0}
          onChange={handlePersonObjectChange}
          required
        >
          <option value="0">مرد</option>
          <option value="1">زن</option>
        </select>
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
          name="personBirthPlace"
          id="birthPlace"
          className="inputBox__form--input"
          value={personObject?.personBirthPlace || ""}
          onChange={handlePersonObjectChange}
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
          name="personPreviousName"
          className="inputBox__form--input"
          value={personObject?.personPreviousName || ""}
          onChange={handlePersonObjectChange}
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
          name="pensionaryid"
          className="inputBox__form--input"
          value={personObject?.pensionaryid || ""}
          onChange={handlePersonObjectChange}
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
          name="personPhone"
          className="inputBox__form--input"
          value={personObject?.personPhone || ""}
          onChange={handlePersonObjectChange}
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
          name="personCellPhone"
          className="inputBox__form--input"
          value={personObject?.personCellPhone || ""}
          onChange={handlePersonObjectChange}
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
          name="personCellPhone2"
          className="inputBox__form--input"
          value={personObject?.personCellPhone2 || ""}
          onChange={handlePersonObjectChange}
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
