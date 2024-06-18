// react imports
import { useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux improts
import { useDispatch } from "react-redux";
import { setNavPanelOpen } from "../slices/themeDataSlice";

// mui imports
import { Button } from "@mui/material";
import {
  ArrowBack as BackIcon,
  HomeOutlined as HomeIcon,
} from "@mui/icons-material";

function Error() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setNavPanelOpen(false));
  }, [dispatch]);

  return (
    <div className="errorContainer">
      <div className="errorContainer__message">
        <img src="./404.png" />
        <h1>صفحه مورد نظر یافت نشد!</h1>
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
