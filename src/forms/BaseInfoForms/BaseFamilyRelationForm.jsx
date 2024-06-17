// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetLookupDataQuery } from "../../slices/sharedApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseFamilyRelationGrid from "../../grids/BaseInfoGrids/BaseFamilyRelationGrid";

function BaseFamilyRelationForm() {
  // LOOK UP STATES
  const [genderCombo, setGenderCombo] = useState([]);
  const [selectedGender, setSelectedGender] = useState(" ");

  // HANDLE LOOK UP DATA
  const {
    data: genderComboItems,
    isSuccess: isGenderComboItemsSuccess,
    error: genderComboItemsError,
  } = useGetLookupDataQuery({ lookUpType: "Gender" });

  useEffect(() => {
    if (isGenderComboItemsSuccess) {
      setGenderCombo(genderComboItems.itemList);
    }
  }, [genderComboItems, isGenderComboItemsSuccess]);

  useEffect(() => {
    if (genderComboItemsError) {
      console.log(genderComboItemsError);
    }
  }, [genderComboItemsError]);

  // CHANGE HANDLERS
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseFamilyRelationRelation"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseFamilyRelationRelation"
            className="inputBox__form--label"
          >
            نسبت
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            id="baseFamilyRelationGender"
            className="inputBox__form--input"
            onChange={handleGenderChange}
            value={selectedGender}
            required
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {genderCombo.map((item) => (
              <option key={item.lookUpID} value={item.lookUpID}>
                {item.lookUpName}
              </option>
            ))}
          </select>
          <label
            htmlFor="baseFamilyRelationGender"
            className="inputBox__form--label"
          >
            جنسیت
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFamilyRelationInsurCoef" />
            <label
              htmlFor="baseFamilyRelationInsurCoef"
              className="checkboxContainer__label"
            >
              ضریب کسر بیمه
            </label>
          </div>
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

      <BaseFamilyRelationGrid />
    </section>
  );

  return content;
}

export default BaseFamilyRelationForm;
