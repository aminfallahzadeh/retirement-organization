// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetRetiredQuery } from "../slices/retiredApiSlice";
import { useGetRetirementStatementQuery } from "../slices/retirementStatementApiSlice";
import {
  useLazyGetRetirementStatementTypeQuery,
  useLazyGetLookupDataQuery,
} from "../slices/sharedApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper";

function RetirementStatementViewForm({ statementID }) {
  const [retirementStatementData, setRetirementStatementData] = useState({});
  const [retiredObject, setRetiredObject] = useState(null);

  // LOOK UP STATEs
  const [gender, setGender] = useState("");
  const [statementType, setStatementType] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACCESS LAZY LOOK UP QUERIES
  const [getLookupData, { isLoading: getLookupDataLoading }] =
    useLazyGetLookupDataQuery();

  const [
    getRetirementStatementType,
    { isLoading: getRetirementStatementTypeLoading },
  ] = useLazyGetRetirementStatementTypeQuery();

  const {
    data: retirementStatement,
    isLoading: getRetirementStatementLoading,
    isSuccess: getRetirementStatementSuccess,
    error,
  } = useGetRetirementStatementQuery({ RetirementStatementID: statementID });

  // GET RETIRED INFO
  const {
    data: retired,
    isLoading: getRetiredLoading,
    isSuccess: getRetiredSuccess,
    error: getRetiredError,
  } = useGetRetiredQuery(personID);

  // FETCH RETIRED DATA
  useEffect(() => {
    if (getRetiredSuccess) {
      console.log(retired);
      setRetiredObject(retired.itemList[0]);
    }
  }, [getRetiredSuccess, retired]);

  // FETCH STATEMENT DATA
  useEffect(() => {
    if (getRetirementStatementSuccess) {
      setRetirementStatementData(retirementStatement);
    }
  }, [getRetirementStatementSuccess, retirementStatement]);

  // HANDLE ERRORs
  useEffect(() => {
    if (getRetiredError) {
      console.log(getRetiredError);
    }
  }, [getRetiredError]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // LOOK UP DATA FUNCTIONS
  const fetchGender = useCallback(
    async (lookUpID) => {
      try {
        const genderRes = await getLookupData({
          lookUpType: "Gender",
          lookUpID,
        }).unwrap();
        setGender(genderRes.itemList[0].lookUpName);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupData]
  );

  const fetchRetirementType = useCallback(
    async (RetirementStatementTypeID) => {
      try {
        const typeRes = await getRetirementStatementType({
          RetirementStatementTypeID,
        }).unwrap();
        setStatementType(typeRes.itemList[0].retirementStatementTypeName);
      } catch (err) {
        console.log(err);
      }
    },
    [getRetirementStatementType]
  );

  // GET LOOKUP DATA
  useEffect(() => {
    if (retiredObject && retiredObject.genderID) {
      fetchGender(retiredObject.genderID);
    }
  }, [retiredObject, fetchGender]);

  useEffect(() => {
    if (
      retirementStatementData &&
      retirementStatementData.retirementStatementTypeID
    ) {
      fetchRetirementType(retirementStatementData.retirementStatementTypeID);
    }
  }, [retirementStatementData, fetchRetirementType]);

  const checkBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #a0a0a0",
    borderRadius: "6px",
    columnGap: "10px",
    padding: "0px 15px",
  };

  const pStyle = {
    marginBottom: "0",
    color: "#b63f00",
    flex: 1,
  };

  const checkBoxLabelStyle = {
    color: "#707070",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5px",
    flex: 1,
  };

  const firstGridStyle = {
    border: "2px solid #a0a0a0",
    borderRadius: "6px",
    padding: "10px",
  };

  const arrowsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    paddingTop: "100px",
    columnGap: "5px",
  };

  const gridTitleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  };

  const gridItemsStyle = {
    backgroundColor: "#f8f8f8",
    border: "2px solid #a0a0a0",
    padding: "5px 10px",
  };

  return (
    <section className="formContainer formContainer--width-lg  flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">کد ملی</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(retiredObject?.personNationalCode)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام</div>
            <div className="inputBox__form--readOnly-content">
              {retiredObject?.personFirstName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام خانوادگی</div>
            <div className="inputBox__form--readOnly-content">
              {retiredObject?.personLastName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره شناسنامه</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(retiredObject?.personCertificateNo)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام پدر</div>
            <div className="inputBox__form--readOnly-content">
              {retiredObject?.personFatherName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">جنسیت</div>
            <div className="inputBox__form--readOnly-content">{gender}</div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personBirth"
          />
          <label className="inputBox__form--label" htmlFor="personBirth">
            تاریخ تولد
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personPlaceBirth"
          />
          <label className="inputBox__form--label" htmlFor="personPlaceBirth">
            محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personMarital"
          />
          <label className="inputBox__form--label" htmlFor="personMarital">
            وضعیت تاهل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personRetiredNum"
          />
          <label className="inputBox__form--label" htmlFor="personRetiredNum">
            شماره بازنشستگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personDegree"
          />
          <label className="inputBox__form--label" htmlFor="personDegree">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personTreatCode"
          />
          <label className="inputBox__form--label" htmlFor="personTreatCode">
            کد درمانی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personChildren"
          />
          <label className="inputBox__form--label" htmlFor="personChildren">
            تعداد فرزند
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personGroup"
          />
          <label className="inputBox__form--label" htmlFor="personGroup">
            گروه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personPostal"
          />
          <label className="inputBox__form--label" htmlFor="personPostal">
            کد پستی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personRetiredDate"
          />
          <label className="inputBox__form--label" htmlFor="personRetiredDate">
            تاریخ بازنشستگی
          </label>
        </div>

        <div style={checkBoxStyle} className="col-span-4">
          <p style={pStyle}>وضعیت ایثارگری</p>

          <div style={itemStyle}>
            <input type="checkbox" id="khShahid" value="khShahid" />
            <label htmlFor="khShahid" style={checkBoxLabelStyle}>
              {" "}
              خانواده شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="warrior" value="warrior" />
            <label htmlFor="warrior" style={checkBoxLabelStyle}>
              رزمنده
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="shahidChild" value="shahidChild" />
            <label htmlFor="shahidChild" style={checkBoxLabelStyle}>
              فرزند شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="sacreficed" value="sacreficed" />
            <label htmlFor="sacreficed" style={checkBoxLabelStyle}>
              جانباز
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="warSacreficed" value="warSacreficed" />
            <label htmlFor="warSacreficed" style={checkBoxLabelStyle}>
              شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="free" value="free" />
            <label htmlFor="free" style={checkBoxLabelStyle}>
              آزاده
            </label>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="jobTitle"
          />
          <label className="inputBox__form--label" htmlFor="jobTitle">
            عنوان شغل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="martabeh"
          />
          <label className="inputBox__form--label" htmlFor="martabeh">
            مرتبه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="maskanYaraneh"
          />
          <label className="inputBox__form--label" htmlFor="maskanYaraneh">
            یارانه حق مسکن
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="lastMilitary"
          />
          <label className="inputBox__form--label" htmlFor="lastMilitary">
            آخرین محل خدمت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="lastPost"
          />
          <label className="inputBox__form--label" htmlFor="lastPost">
            آخرین پست سازمانی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="realSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="realSanatavat">
            سنوات خدمت واقعی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="bonusSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="bonusSanatavat">
            سنوات ارفاقی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="retiredSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="retiredSanatavat">
            سنوات بازنشستگی
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">اطلاعات حکم بازنشستگی</h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نوع حکم</div>
            <div className="inputBox__form--readOnly-content">
              {statementType}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">سریال حکم</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(
                retirementStatementData.retirementStatementSerial
              )}
            </div>
          </div>
        </div>

        <div className="inputBox__form col-span-4 row-span-2">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شرح حکم</div>
            <div className="inputBox__form--readOnly-content">
              {retirementStatementData.retirementStatementDesc}
            </div>
          </div>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">اطلاعات پشتیبان</h4>
      </div>

      <form method="POSt" className="grid grid--col-4">
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
            id="backupFamily"
          />
          <label className="inputBox__form--label" htmlFor="backupFamily">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupRelation"
          />
          <label className="inputBox__form--label" htmlFor="backupRelation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupTell"
          />
          <label className="inputBox__form--label" htmlFor="backupTell">
            تلفن
          </label>
        </div>
      </form>
      <form method="POST" className="grid grid--col-7 u-margin-top-md">
        <div style={firstGridStyle} className="row-span-4 col-span-2">
          <p style={pStyle}>آیتم های حکم</p>
        </div>
        <div style={arrowsStyle}>
          <p style={pStyle}>&lt;&lt;</p>
          <p style={pStyle}>&gt;&gt;</p>
        </div>
        <div style={firstGridStyle} className="row-span-4 col-span-2">
          <p style={pStyle}>آیتم حکم</p>
        </div>
      </form>

      <form className="grid grid--col-3 u-margin-top-md">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">تاریخ اجرا</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(
                convertToPersianDateFormatted(
                  retirementStatementData.retirementStatementRunDate
                )
              )}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">تاریخ صدور</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(
                convertToPersianDateFormatted(
                  retirementStatementData.retirementStatementIssueDate
                )
              )}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره حکم</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(
                retirementStatementData.retirementStatementNo
              )}
            </div>
          </div>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">موظفین</h4>
      </div>

      <div style={gridTitleStyle}>
        <div style={gridItemsStyle}>ردیف</div>
        <div style={gridItemsStyle}>کد ملی</div>
        <div style={gridItemsStyle}>نام</div>
        <div style={gridItemsStyle}>نام خانوادگی</div>
        <div style={gridItemsStyle}>نام پدر</div>
        <div style={gridItemsStyle}>نسبت</div>
        <div style={gridItemsStyle}>تاریخ تولد</div>
        <div style={gridItemsStyle}>حقوق وظیفه</div>
        <div style={gridItemsStyle}>بازنشستگی تکمیلی</div>
        <div style={gridItemsStyle}>حق تاهل</div>
        <div style={gridItemsStyle}>حق اولاد</div>
      </div>

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

export default RetirementStatementViewForm;
