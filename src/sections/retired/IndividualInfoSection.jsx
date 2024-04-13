// component imports
import RetiredAdditionalInfo from "../../forms/RetiredAdditionalInfo";
import RetiredPensionaryForm from "../../forms/RetiredPensionaryForm";
import RetiredPersonForm from "../../forms/RetiredPersonForm";
import ArchiveTree from "../../components/ArchiveTree";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  Save as SaveIcon,
  ArrowDropDown as ArrowDropDownIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  AdfScannerOutlined as AdfScannerOutlinedIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function IndividualInfoSection() {
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const content = (
    <section className="pensionersAffairs">
      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPersonForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPensionaryForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredAdditionalInfo personID={selectedRequestData?.personId} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          پرونده الکترونیک
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex-col">
            <div className="flex-row">
              <ArchiveTree />
              <img src="./images/sample-statement.png" />
            </div>
            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                endIcon={<DeleteOutlinedIcon />}
                variant="contained"
                color="error"
                sx={{ fontFamily: "sahel" }}
              >
                <span>حذف</span>
              </LoadingButton>
              <Button
                dir="ltr"
                endIcon={<AdfScannerOutlinedIcon />}
                variant="contained"
                color="primary"
                sx={{ fontFamily: "sahel" }}
              >
                <span>اسکن</span>
              </Button>
              <Button
                dir="ltr"
                endIcon={<AddIcon />}
                variant="contained"
                color="primary"
                sx={{ fontFamily: "sahel" }}
              >
                <span>اضافه</span>
              </Button>
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
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default IndividualInfoSection;
