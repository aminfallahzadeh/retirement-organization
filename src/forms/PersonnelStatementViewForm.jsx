// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";

// mui imports
import { CircularProgress, Box } from "@mui/material";

// components
import PersonnelStatementViewGrid from "../grids/PersonnelStatementViewGrid";

// helpers
import { convertToPersianNumber } from "../helper";

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
      setData(personnelStatement.itemList[0]);

      const mappedData =
        personnelStatement.itemList[0].personnelStatementItems.map(
          (item, index) => ({
            id: item.personnelStatementID,
            personnelStatementRowNum: index + 1,
            personnelStatementDesc: item.personnelStatementItemTypeName,
            personnelStatementAmount: item.personnelStatementItemAmount,
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
        <section className="formContainer-transparent formContainer--width-lg flex-col">
          <form method="POST" className="grid grid--col-4">
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                name="firstName"
                disabled
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
                name="nationalCode"
                disabled
                value={convertToPersianNumber(data.personNationalCode) || "-"}
                id="nationalCode"
              />
              <label className="inputBox__form--label" htmlFor="firstName">
                شماره ملی
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                name="personID"
                disabled
                value={convertToPersianNumber(data.personID) || "-"}
                id="personID"
              />
              <label className="inputBox__form--label" htmlFor="firstName">
                شماره کارمندی
              </label>
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
