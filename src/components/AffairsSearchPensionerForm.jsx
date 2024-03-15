// bootstrap imports
import { Button } from "react-bootstrap";

// library imports
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AffairsSearchPensionerForm() {
  const content = (
    <div className="SearchPensioner">
      <form method="POST" noValidate className="SearchPensioner__form">
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

        <Button variant="primary" className="SearchPensioner__form--colSpan4">
          جست و جو
        </Button>

        <Button variant="warning" className="SearchPensioner__form--colSpan3">
          درخواست دسترسی پرونده ها
        </Button>

        <Button variant="success" className="SearchPensioner__form--btn">
          ایجاد پرونده جدید <AddCircleIcon />
        </Button>
      </form>
    </div>
  );
  return content;
}

export default AffairsSearchPensionerForm;
