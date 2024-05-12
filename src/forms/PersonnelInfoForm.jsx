// react imports
import { useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonsQuery } from "../slices/personApiSlice.js";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";

// library imports
import { toast } from "react-toastify";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper";

function PersonnelInfoForm() {
  const [personObject, setPersonObject] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // GET MAIN DATA
  const { data: person, isSuccess, error } = useGetPersonsQuery({ personID });

  // HANDLE MAIN DATA
  useEffect(() => {
    if (isSuccess) {
      setPersonObject(person?.itemList[0]);
    }
  }, [isSuccess, person?.itemList]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // GET LOOKUP DATA
  const { data: gender } = useGetLookupDataQuery({
    lookUpType: "Gender",
    lookUpID: personObject?.genderID,
  });

  const { data: maritalStatus } = useGetLookupDataQuery({
    lookUpType: "MaritialStatus",
    lookUpID: personObject?.maritalStatusID,
  });

  const { data: education } = useGetLookupDataQuery({
    lookUpType: "EducationType",
    lookUpID: personObject?.educationTypeID,
  });

  const content = (
    <section className="formContainer">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">کد ملی</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject.personNationalCode)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره کارمندی</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject.personID)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام</div>
            <div className="inputBox__form--readOnly-content">
              {personObject.personFirstName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام</div>
            <div className="inputBox__form--readOnly-content">
              {personObject.personLastName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره شناسنامه</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject.personCertificateNo)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام پدر</div>
            <div className="inputBox__form--readOnly-content">
              {personObject.personFatherName || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(
                convertToPersianDateFormatted(personObject.personBirthDate)
              )}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">محل تولد</div>
            <div className="inputBox__form--readOnly-content">
              {personObject.personBirthPlace || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">جنسیت</div>
            <div className="inputBox__form--readOnly-content">
              {gender?.itemList[0].lookUpName || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">وضعیت تاهل</div>
            <div className="inputBox__form--readOnly-content">
              {maritalStatus?.itemList.lenghth === 1
                ? maritalStatus?.itemList[0].lookUpName
                : "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">مدرک تحصیلی</div>
            <div className="inputBox__form--readOnly-content">
              {education?.itemList.lenghth === 1
                ? education?.itemList[0].lookUpName
                : "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">ورود به خدمت</div>
            <div className="inputBox__form--readOnly-content">-</div>
          </div>
        </div>
      </form>
    </section>
  );

  return content;
}

export default PersonnelInfoForm;
