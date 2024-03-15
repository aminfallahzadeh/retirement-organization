// component
import UserButton from "./UserButton";

function AffairsSearchPensionerForm() {
  const content = (
    <div className="formContainer">
      <form method="POST" noValidate className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            id="codeMeli"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="codeMeli" className="inputBox__form--label">
            کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="pensNum"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="pensNum" className="inputBox__form--label">
            شماره بازنشسته
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="Name"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="Name" className="inputBox__form--label">
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="SurName"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="SurName" className="inputBox__form--label">
            نام خانوادگی
          </label>
        </div>

        <div className="col-span-4">
          <UserButton variant={"outline-primary"} icon={"search"}>
            جست و جو
          </UserButton>
        </div>
      </form>
    </div>
  );
  return content;
}

export default AffairsSearchPensionerForm;
