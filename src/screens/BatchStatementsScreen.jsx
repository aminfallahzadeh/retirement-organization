// componsnets
import BatchStatementsForm from "../forms/BatchStatementsForm";

// mui imports
import { Button } from "@mui/material";
import {
  EditCalendar as EditCalenderIcon,
  Add as AddIcon,
} from "@mui/icons-material";

function BatchStatementsScreen() {
  return (
    <div className="main flex-col">
      <div>
        <BatchStatementsForm />
      </div>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <Button
          dir="ltr"
          endIcon={<AddIcon />}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>اضافه کردن آیتم</span>
        </Button>
        <Button
          dir="ltr"
          endIcon={<EditCalenderIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ایجاد پیش نویس</span>
        </Button>
      </div>
    </div>
  );
}

export default BatchStatementsScreen;
