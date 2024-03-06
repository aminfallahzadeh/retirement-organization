// bootstrap imports
import { Button } from "react-bootstrap";

// library imports
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AffairsSearchPensionerForm() {
  const content = (
    <div className="SearchPensioner">
      <form method="POST" noValidate className="SearchPensioner__form">
        <div className="inputBox">
          <input
            type="text"
            id="codeMeli"
            className="input field input--dark"
            required
          />
          <label htmlFor="codeMeli" className="label label--light">
            کد ملی
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="pensNum"
            className="input field input--dark"
            required
          />
          <label htmlFor="pensNum" className="label label--light">
            شماره بازنشسته
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="Name"
            className="input field input--dark"
            required
          />
          <label htmlFor="Name" className="label label--light">
            نام
          </label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="SurName"
            className="input field input--dark"
            required
          />
          <label htmlFor="SurName" className="label label--light">
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
