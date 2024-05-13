// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetRetiredQuery } from "../slices/retiredApiSlice";
import { useLazyGetRetirementStatementQuery } from "../slices/retirementStatementApiSlice";
import {
  useLazyGetRetirementStatementTypeQuery,
  useLazyGetLookupDataQuery,
} from "../slices/sharedApiSlice";

// mui imports
import { Box, CircularProgress } from "@mui/material";

// components
import StatementViewRelatedGrid from "../grids/StatementViewRelatedGrid";
import StatementViewHeirGrid from "../grids/StatementViewHeirGrid";

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
  const [maritialStatus, setMaritialStatus] = useState("");
  const [statementType, setStatementType] = useState("");
  const [educationType, setEducationType] = useState("");

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

  // ACCESS LAZY RETIREMENT STATEMENT QUERy
  const [getRetirementStatement, { isLoading: getRetirementStatementLoading }] =
    useLazyGetRetirementStatementQuery();

  // FETCH STATEMENT OBJECT FUNCTION
  const fetchStatement = useCallback(
    async (RetirementStatementID) => {
      try {
        const res = await getRetirementStatement({
          RetirementStatementID,
        }).unwrap();
        setRetirementStatementData(res);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    },
    [getRetirementStatement]
  );

  // GET RETIRED INFO
  const {
    data: retired,
    isLoading: getRetiredLoading,
    isFetching: getRetiredFetching,
    isSuccess: getRetiredSuccess,
    error: getRetiredError,
    refetch: retiredRefetch,
  } = useGetRetiredQuery(personID);

  // FETCH RETIRED DATA
  useEffect(() => {
    retiredRefetch();
    if (getRetiredSuccess) {
      setRetiredObject(retired.itemList[0]);
    }
    return () => {
      setRetiredObject(null);
    };
  }, [getRetiredSuccess, retired, retiredRefetch]);

  // FETCH STATEMENT DATA IF ID EXISTS
  useEffect(() => {
    if (statementID) {
      fetchStatement(statementID);
    }
  }, [statementID, fetchStatement]);

  // HANDLE ERRORs
  useEffect(() => {
    if (getRetiredError) {
      console.log(getRetiredError);
    }
  }, [getRetiredError]);

  // LOOK UP DATA FUNCTIONS
  const fetchLookUp = useCallback(
    async (type, id) => {
      try {
        const genderRes = await getLookupData({
          lookUpType: type,
          lookUpID: id,
        }).unwrap();
        return genderRes;
        // setGender(genderRes.itemList[0].lookUpName);
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
      const fetchData = async () => {
        try {
          const data = await fetchLookUp("Gender", retiredObject.genderID);
          setGender(data.itemList[0].lookUpName);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [retiredObject, fetchLookUp]);

  useEffect(() => {
    if (retiredObject && retiredObject.maritalStatusID) {
      const fetchData = async () => {
        try {
          const data = await fetchLookUp(
            "MaritialStatus",
            retiredObject.maritalStatusID
          );
          setMaritialStatus(data.itemList[0].lookUpName);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [retiredObject, fetchLookUp]);

  useEffect(() => {
    if (retiredObject && retiredObject.educationTypeID) {
      const fetchData = async () => {
        try {
          const data = await fetchLookUp(
            "EducationType",
            retiredObject.educationTypeID
          );
          setEducationType(data.itemList[0].lookUpName);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [retiredObject, fetchLookUp]);

  useEffect(() => {
    if (
      retirementStatementData &&
      retirementStatementData.retirementStatementTypeID
    ) {
      fetchRetirementType(retirementStatementData.retirementStatementTypeID);
    }
  }, [retirementStatementData, fetchRetirementType]);

  const pStyle = {
    marginBottom: "0",
    color: "#b63f00",
    flex: 1,
  };

  const firstGridStyle = {
    border: "2px solid #a0a0a0",
    borderRadius: "6px",
    padding: "10px",
  };

  return (
    <>
      {getRetiredLoading ||
      getRetiredFetching ||
      !retiredObject ||
      getLookupDataLoading ||
      getRetirementStatementTypeLoading ||
      getRetirementStatementLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
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
                <div className="inputBox__form--readOnly-label">
                  نام خانوادگی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {retiredObject?.personLastName}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  شماره شناسنامه
                </div>
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
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(
                    convertToPersianDateFormatted(
                      retiredObject?.personBirthDate
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">محل تولد</div>
                <div className="inputBox__form--readOnly-content">
                  {retiredObject?.personBirthPlace}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">وضعیت تاهل</div>
                <div className="inputBox__form--readOnly-content">
                  {maritialStatus}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  شماره بازنشستگی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredID) ?? ""}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  مدرک تحصیلی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {educationType}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">کد درمانی</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.insuranceCode)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  تعداد فرزند
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.childCount)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">گروه</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredGroup)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">کد پستی</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.personPostalCode)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  تاریخ بازنشستگی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(
                    convertToPersianDateFormatted(retiredObject?.retirementDate)
                  )}
                </div>
              </div>
            </div>

            <div className="checkboxContainer col-span-4">
              <p className={"checkboxContainer__title"}>وضعیت ایثارگری:</p>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsSacrificedFamily"
                  name="personIsSacrificedFamily"
                  checked={!!retiredObject?.personIsSacrificedFamily}
                  readOnly
                />
                <label
                  htmlFor="personIsSacrificedFamily"
                  className={"checkboxContainer__label"}
                >
                  {" "}
                  خانواده شهید
                </label>
              </div>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsWarrior"
                  name="personIsWarrior"
                  checked={!!retiredObject?.personIsWarrior}
                  readOnly
                />
                <label
                  htmlFor="personIsWarrior"
                  className={"checkboxContainer__label"}
                >
                  رزمنده
                </label>
              </div>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsChildOfSacrificed"
                  name="personIsChildOfSacrificed"
                  checked={!!retiredObject?.personIsChildOfSacrificed}
                  readOnly
                />
                <label
                  htmlFor="personIsChildOfSacrificed"
                  className={"checkboxContainer__label"}
                >
                  فرزند شهید
                </label>
              </div>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsValiant"
                  name="personIsValiant"
                  checked={!!retiredObject?.personIsValiant}
                  readOnly
                />
                <label
                  htmlFor="personIsValiant"
                  className={"checkboxContainer__label"}
                >
                  جانباز
                </label>
              </div>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsSacrificed"
                  name="personIsSacrificed"
                  checked={!!retiredObject?.personIsSacrificed}
                  readOnly
                />
                <label
                  htmlFor="personIsSacrificed"
                  className={"checkboxContainer__label"}
                >
                  شهید
                </label>
              </div>

              <div className="checkboxContainer__item">
                <input
                  type="checkbox"
                  id="personIsCaptive"
                  name="personIsCaptive"
                  checked={!!retiredObject?.personIsCaptive}
                  readOnly
                />
                <label
                  htmlFor="personIsCaptive"
                  className={"checkboxContainer__label"}
                >
                  آزاده
                </label>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">مرتبه</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredJobDegree)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  آخرین محل خدمت
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.lastOrganization)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  آخرین پست سازمانی{" "}
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredLastPosition)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  سنوات خدمت واقعی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredRealDuration)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  سنوات ارفاقی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.retiredGrantDuration)}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  سنوات بازنشستگی
                </div>
                <div className="inputBox__form--readOnly-content"></div>
              </div>
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
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">نام</div>
                <div className="inputBox__form--readOnly-content">
                  {retiredObject?.backupFirstName}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  نام خانوادگی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {retiredObject?.backupLastName}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">نسبت</div>
                <div className="inputBox__form--readOnly-content">
                  {retiredObject?.backupRelation}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">تلفن</div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(retiredObject?.backupPhone)}
                </div>
              </div>
            </div>
          </form>
          <form method="POST" className="grid grid--col-2 u-margin-top-md">
            <div style={firstGridStyle} className="row-span-4">
              <p style={pStyle}>آیتم های حکم</p>
            </div>
            <div style={firstGridStyle} className="row-span-4">
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
            <h4 className="title-secondary">
              {retiredObject?.personDeathDate ? "موظفین" : "وابستگان"}
            </h4>
          </div>
          <div>
            {retiredObject?.personDeathDate ? (
              <StatementViewHeirGrid
                relatedList={
                  retirementStatementData.retirementStatementRelatedList
                }
                amountList={
                  retirementStatementData.retirementStatementAmountList
                }
              />
            ) : (
              <StatementViewRelatedGrid
                relatedList={
                  retirementStatementData.retirementStatementRelatedList
                }
                amountList={
                  retirementStatementData.retirementStatementAmountList
                }
              />
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default RetirementStatementViewForm;
