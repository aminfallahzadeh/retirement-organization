// react imports
// rrd imports
import { useNavigate } from "react-router-dom";

// componsnets
import BatchStatementsForm from "../forms/BatchStatementsForm";

// mui imports
import { Tooltip, IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

function BatchStatementsScreen() {
  const navigate = useNavigate();

  const content = (
    <>
      <section className="flex-col">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline">احکام گروهی</span>
          </h4>

          <div style={{ marginRight: "auto" }} className="back-button">
            <Tooltip title="بازگشت">
              <span>
                <IconButton color="primary" onClick={() => navigate(-1)}>
                  <BackIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>

        <BatchStatementsForm />
      </section>
    </>
  );
  return content;
}

export default BatchStatementsScreen;
