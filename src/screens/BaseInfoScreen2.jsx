// components
import BaseInfoForm2 from "../forms/BaseInfoForms2/BaseInfoForm2";

// libnrary imports
import Select from "react-select";

function BaseInfoScreen2() {
  const options = [
    { value: "1001", label: "آیتم های تسهیلاتی" },
    { value: "1002", label: "آیتم های حقوقی" },
    { value: "1003", label: "آیتم های حکم کارمندان" },
    { value: "1004", label: "انواع استخدام" },
    { value: "1005", label: "انواع استخدام کارمندی" },
    { value: "1006", label: "انواع بستانکار" },
    { value: "1007", label: "تسهیلات" },
    { value: "1008", label: "تور" },
    { value: "1009", label: "انواع حکم بازنشستگی" },
    { value: "1010", label: "انواع حکم غیر رسمی" },
  ];

  const content = (
    <section className="flex-col u-margin-bottom-xl">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات پایه
        </h4>
      </div>

      <div className="formContainer grid grid--col-4">
        <Select
          options={options}
          isRtl={true}
          isClearable={true}
          isSearchable={true}
          noOptionsMessage={() => "موردی یافت نشد!"}
          placeholder="نوع اطلاعات..."
          styles={{
            control: (base) => ({
              ...base,
              fontFamily: "IranYekan",
              cursor: "pointer",
              fontSize: "12px",
              height: "100%",
            }),
            menu: (base) => ({
              ...base,
              fontFamily: "IranYekan",
            }),
            option: (base) => ({
              ...base,
              cursor: "pointer",
            }),
          }}
        />
      </div>

      <BaseInfoForm2 />
    </section>
  );

  return content;
}

export default BaseInfoScreen2;
