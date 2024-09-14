// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";

// mui imports
import { CircularProgress, Box } from "@mui/material";

// components
import PersonnelStatementViewGrid from "../grids/PersonnelStatementViewGrid";
import PersonnelStatementRelatedGrid from "../grids/PersonnelStatementRelatedGrid";

// helpers
import { convertToPersianNumber } from "../helper";

// library imports
import { Checkbox } from "@mui/material";

function PersonnelStatementViewForm({ statementID }) {
  // MAIN STATE
  const [data, setData] = useState({});
  const [gridData, setGridData] = useState([]);

  // GET DATA
  const {
    data: personnelStatement,
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useGetPersonnelStatementQuery({ PersonnelStatementID: statementID });

  // FETCH DATA
  useEffect(() => {
    if (isSuccess) {
      console.log(personnelStatement.itemList[0]);
      setData(personnelStatement.itemList[0]);

      const mappedData =
        personnelStatement.itemList[0].personnelStatementItems.map(
          (item, index) => ({
            id: item.personnelStatementID,
            personnelStatementItemRowNum: index + 1,
            personnelStatementItemDesc: item.personnelStatementItemTypeName,
            personnelStatementItemAmount: item.personnelStatementItemAmount,
          })
        );

      setGridData(mappedData);
    }
  }, [isSuccess, personnelStatement, data]);

  // HANDLE ERROR
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const content = (
    <>
      {isLoading || isFetching ? (
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
        <section className="formContainer-transparent flex-col">
          <form method="POST" className="flex-col">
            <div className="grid grid--col-4">
              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="nationalCode"
                  disabled
                  value={convertToPersianNumber(data.personNationalCode) || "-"}
                  id="nationalCode"
                />
                <label className="inputBox__form--label" htmlFor="firstName">
                  کد ملی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="firstName"
                  disabled
                  value={data.personFirstName || "-"}
                  id="firstName"
                />
                <label className="inputBox__form--label" htmlFor="firstName">
                  نام
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="lastName"
                  disabled
                  value={data.personLastName || "-"}
                  id="lastName"
                />
                <label className="inputBox__form--label" htmlFor="firstName">
                  نام خانوادگی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personID"
                  disabled
                  value={convertToPersianNumber(data.personnelID) || "-"}
                  id="personID"
                />
                <label className="inputBox__form--label" htmlFor="firstName">
                  شماره کارمندی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personCertificateNo"
                  disabled
                  value={"-"}
                  id="personCertificateNo"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personCertificateNo"
                >
                  شماره شناسنامه
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personFatherName"
                  disabled
                  value={"-"}
                  id="personFatherName"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personFatherName"
                >
                  نام پدر
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personBirthDate"
                  disabled
                  value={"-"}
                  id="personBirthDate"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personBirthDate"
                >
                  تاریخ تولد
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personBirthPlace"
                  disabled
                  value={"-"}
                  id="personBirthPlace"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personBirthPlace"
                >
                  محل تولد
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="gender"
                  disabled
                  value={"-"}
                  id="gender"
                />
                <label className="inputBox__form--label" htmlFor="gender">
                  جنسیت
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="numberOfChildren"
                  disabled
                  value={"-"}
                  id="numberOfChildren"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="numberOfChildren"
                >
                  تعداد فرزندان
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="numberOfRelated"
                  disabled
                  value={"-"}
                  id="numberOfRelated"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="numberOfRelated"
                >
                  تعداد افراد تحت تکفل
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="insuranceCode"
                  disabled
                  value={"-"}
                  id="insuranceCode"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="insuranceCode"
                >
                  کد درمانی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="maritialStatus"
                  disabled
                  value={"-"}
                  id="maritialStatus"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="maritialStatus"
                >
                  وضعیت تاهل
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="postalCode"
                  disabled
                  value={"-"}
                  id="postalCode"
                />
                <label className="inputBox__form--label" htmlFor="postalCode">
                  کد پستی
                </label>
              </div>

              <div></div>
              <div></div>

              <div className={"checkboxContainer--disabled col-span-4"}>
                <p className="inputBox__form--readOnly-label">
                  وضعیت ایثارگری:
                </p>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    name="personIsSacrificedFamily"
                    id="personIsSacrificedFamily"
                    sx={{
                      padding: 0.5,
                    }}
                  />
                  <label
                    htmlFor="personIsSacrificedFamily"
                    className={"checkboxContainer__label"}
                  >
                    خانواده شهید
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    id="personIsWarrior"
                    name="personIsWarrior"
                    sx={{
                      padding: 0.5,
                    }}
                  />
                  <label
                    htmlFor="personIsWarrior"
                    className={"checkboxContainer__label"}
                  >
                    رزمنده
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    id="personIsChildOfSacrificed"
                    name="personIsChildOfSacrificed"
                    sx={{
                      padding: 0.5,
                    }}
                  />

                  <label
                    htmlFor="personIsChildOfSacrificed"
                    className={"checkboxContainer__label"}
                  >
                    فرزند شهید
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    id="personIsValiant"
                    name="personIsValiant"
                    sx={{
                      padding: 0.5,
                    }}
                  />

                  <label
                    htmlFor="personIsValiant"
                    className={"checkboxContainer__label"}
                  >
                    جانباز
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    id="personIsSacrificed"
                    name="personIsSacrificed"
                    sx={{
                      padding: 0.5,
                    }}
                  />

                  <label
                    htmlFor="personIsSacrificed"
                    className={"checkboxContainer__label"}
                  >
                    شهید
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled
                    id="personIsCaptive"
                    name="personIsCaptive"
                    sx={{
                      padding: 0.5,
                    }}
                  />
                  <label
                    htmlFor="personIsCaptive"
                    className={"checkboxContainer__label"}
                  >
                    آزاده
                  </label>
                </div>
              </div>
            </div>

            <div
              className="Modal__header u-margin-top-sm"
              style={{ textAlign: "center" }}
            >
              <h4 className="title-secondary">مشخصات فردی</h4>
            </div>

            <div className="grid grid--col-3 u-margin-top-md">
              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="retirementDate"
                  disabled
                  value={"-"}
                  id="retirementDate"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="retirementDate"
                >
                  تاریخ بازنشستگی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="retiredLastPostition"
                  disabled
                  value={"-"}
                  id="retiredLastPostition"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="retiredLastPostition"
                >
                  آخرین پست سازمانی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="lasstOrganization"
                  disabled
                  value={"-"}
                  id="lasstOrganization"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="lasstOrganization"
                >
                  آخرین محل خدمت
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="realDuration"
                  disabled
                  value={"-"}
                  id="realDuration"
                />
                <label className="inputBox__form--label" htmlFor="realDuration">
                  سنوات خدمت واقعی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="grantDuration"
                  disabled
                  value={"-"}
                  id="grantDuration"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="grantDuration"
                >
                  سنوات ارفاقی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="retirementDuration"
                  disabled
                  value={"-"}
                  id="retirementDuration"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="retirementDuration"
                >
                  سنوات بازنشستگی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="group"
                  disabled
                  value={"-"}
                  id="group"
                />
                <label className="inputBox__form--label" htmlFor="group">
                  گروه
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="martabe"
                  disabled
                  value={"-"}
                  id="martabe"
                />
                <label className="inputBox__form--label" htmlFor="martabe">
                  مرتبه
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="educationDegree"
                  disabled
                  value={"-"}
                  id="educationDegree"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="educationDegree"
                >
                  مدرک تحصیلی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="statementType"
                  disabled
                  value={"-"}
                  id="statementType"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="statementType"
                >
                  نوع حکم
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="employmentTypeName"
                  disabled
                  value={"-"}
                  id="employmentTypeName"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="employmentTypeName"
                >
                  عنوان شغل
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personDeathDate"
                  disabled
                  value={"-"}
                  id="personDeathDate"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personDeathDate"
                >
                  تاریخ فوت
                </label>
              </div>
            </div>

            <div
              className="Modal__header u-margin-top-sm"
              style={{ textAlign: "center" }}
            >
              <h4 className="title-secondary">مشخصات افراد تحت تکفل</h4>
            </div>

            <PersonnelStatementRelatedGrid />

            <div className="grid grid--col-3 u-margin-top-md">
              <div className="inputBox__form col-span-3">
                <textarea
                  disabled
                  type="text"
                  id="statemetnDesc"
                  value={"-"}
                  name="statemetnDesc"
                  className="inputBox__form--input"
                  style={{ overflow: "hidden" }}
                  required
                ></textarea>
                <label
                  htmlFor="statemetnDesc"
                  className="inputBox__form--label"
                >
                  شرح حکم
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="statementRunDate"
                  disabled
                  value={"-"}
                  id="statementRunDate"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="statementRunDate"
                >
                  تاریخ اجرا
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="statementIssueDate"
                  disabled
                  value={"-"}
                  id="statementIssueDate"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="statementIssueDate"
                >
                  تاریخ صدور
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="statementIssueNumber"
                  disabled
                  value={"-"}
                  id="statementIssueNumber"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="statementIssueNumber"
                >
                  شماره صدور
                </label>
              </div>
            </div>
          </form>

          <div
            className="Modal__header u-margin-top-sm"
            style={{ textAlign: "center" }}
          >
            <h4 className="title-secondary">آیتم های حقوق مشمول کسور</h4>
          </div>

          <PersonnelStatementViewGrid data={gridData} />
        </section>
      )}
    </>
  );

  return content;
}

export default PersonnelStatementViewForm;
