// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Button } from "@mui/material";
import {
  ArrowBack as BackIcon,
  HomeOutlined as HomeIcon,
} from "@mui/icons-material";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="errorContainer">
      <div className="errorContainer__message">
        <img src="./404.png" />
        <h1>آدرس مورد نظر یافت نشد!</h1>
      </div>

      <div className="errorContainer__buttons u-margin-top-md">
        <Button
          dir="ltr"
          endIcon={<HomeIcon />}
          onClick={() => navigate("/retirement-organization/cartable")}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>کارتابل</span>
        </Button>

        <Button
          dir="ltr"
          endIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
          color="warning"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بازگشت</span>
        </Button>
      </div>
    </div>
  );
}

export default Error;
