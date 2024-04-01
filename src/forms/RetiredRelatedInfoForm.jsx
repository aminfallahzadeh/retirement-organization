// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

function RetiredRelatedInfoForm() {
  return (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="relation"
          />
          <label className="inputBox__form--label" htmlFor="relation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="fname"
          />
          <label className="inputBox__form--label" htmlFor="fname">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="lname"
          />
          <label className="inputBox__form--label" htmlFor="lname">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="nationalCode"
          />
          <label className="inputBox__form--label" htmlFor="nationalCode">
            کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="shsh"
          />
          <label className="inputBox__form--label" htmlFor="shsh">
            شماره شناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="fatherNames"
          />
          <label className="inputBox__form--label" htmlFor="fatherNames">
            نام پدر
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="dob"
          />
          <label className="inputBox__form--label" htmlFor="dob">
            تاریخ تولد
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="pob"
          />
          <label className="inputBox__form--label" htmlFor="pob">
            محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="maritalStatus"
          />
          <label className="inputBox__form--label" htmlFor="maritalStatus">
            وضعیت تاهل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="uniDegree"
          />
          <label className="inputBox__form--label" htmlFor="uniDegree">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="studyLevel"
          />
          <label className="inputBox__form--label" htmlFor="studyLevel">
            مقطع تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="degreeTitle"
          />
          <label className="inputBox__form--label" htmlFor="degreeTitle">
            عنوان مدرک
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="univer"
          />
          <label className="inputBox__form--label" htmlFor="univer">
            دانشگاه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="uniUnit"
          />
          <label className="inputBox__form--label" htmlFor="uniUnit">
            واحد دانشگاهی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cutDate"
          />
          <label className="inputBox__form--label" htmlFor="cutDate">
            تاریخ قطع
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cellTell1"
          />
          <label className="inputBox__form--label" htmlFor="cellTell1">
            تلفن همراه ۱
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cellTell2"
          />
          <label className="inputBox__form--label" htmlFor="cellTell2">
            تلفن همراه ۲
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="sabetTell1"
          />
          <label className="inputBox__form--label" htmlFor="sabetTell1">
            تلفن ثابت ۱
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="sabetTell2"
          />
          <label className="inputBox__form--label" htmlFor="saetTell2">
            تلفن ثابت ۲
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="regionPlace"
          />
          <label className="inputBox__form--label" htmlFor="regionPlace">
            منطقه سکونت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="districtPlace"
          />
          <label className="inputBox__form--label" htmlFor="districtPlace">
            ناحیه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="countryPlace"
          />
          <label className="inputBox__form--label" htmlFor="countryPlace">
            کشور
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="statePlace"
          />
          <label className="inputBox__form--label" htmlFor="statePlace">
            استان
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cityPlace"
          />
          <label className="inputBox__form--label" htmlFor="cityPlace">
            شهر
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="postalCODE"
          />
          <label className="inputBox__form--label" htmlFor="postalCODE">
            کد پستی
          </label>
        </div>

        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="addresss"
          />
          <label className="inputBox__form--label" htmlFor="addresss">
            نشانی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="specialCase"
          />
          <label className="inputBox__form--label" htmlFor="specialCase">
            بیماری خاص
          </label>
        </div>

        <div className="inputBox__form col-span-3 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            id="descriptionPlace"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="descriptionPlace">
            توضیحات
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="aghdDate"
          />
          <label className="inputBox__form--label" htmlFor="aghdDate">
            تاریخ عقد
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4> اطلاعات خویش فرمایی</h4>
        <hr />
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form col-span-2">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="condi"
          />
          <label className="inputBox__form--label" htmlFor="condi">
            وضعیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="startDate"
          />
          <label className="inputBox__form--label" htmlFor="startDate">
            تاریخ شروع
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="endDate"
          />
          <label className="inputBox__form--label" htmlFor="endDate">
            تاریخ پایان
          </label>
        </div>

        <div className="inputBox__form col-span-4">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="desc2"
          />
          <label className="inputBox__form--label" htmlFor="desc2">
            توضیحات
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4>اطلاعات پشتیبان</h4>
        <hr />
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupName"
          />
          <label className="inputBox__form--label" htmlFor="backupName">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupSurname"
          />
          <label className="inputBox__form--label" htmlFor="BackupSurname">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupRelation"
          />
          <label className="inputBox__form--label" htmlFor="BackupRelation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupPhone"
          />
          <label className="inputBox__form--label" htmlFor="BackupPhone">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupCellPhone"
          />
          <label className="inputBox__form--label" htmlFor="BackupCellPhone">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupAddress"
          />
          <label className="inputBox__form--label" htmlFor="BackupAddress">
            نشانی
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default RetiredRelatedInfoForm;
