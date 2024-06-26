// react imports
import { useEffect, useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Tab, Button, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  ArrowUpwardOutlined as SendIcon,
  Print as PrintIcon,
  KeyboardReturn as ReturnIcon,
  ArrowBack as BackIcon,
  Done as DoneIcon,
} from "@mui/icons-material";

// components
import RequestAttachmentsSection from "../sections/request/RequestAttachmentsSection";
import RequestHistorySection from "../sections/request/RequestHistorySection";
import RequestInfoForm from "../forms/RequestInfoForm";
import SendRequestFrom from "../forms/SendRequestForm";
import ReturnRequestForm from "../forms/ReturnRequestForm";
import Modal from "../components/Modal";

function RequestScreen() {
  const [value, setValue] = useState("1");

  // REQUEST CONDTIONS STATE
  const [requestCondition, setRequestCondition] = useState(null);

  // MODAL STATES
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const [showReturnRequestModal, setShowReturnRequestModal] = useState(false);

  // BUTTON STATES
  const [showBackButton, setShowBackButton] = useState(false);
  const [sendOrConfirmButton, setSendOrConfirmButton] = useState(false);

  const navigate = useNavigate();

  // HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowSendRequestModal = () => {
    setShowSendRequestModal(true);
  };

  const handleShowReturnRequestModal = () => {
    setShowReturnRequestModal(true);
  };

  // HANDLE BUTTONS BASED ON REQUEST STATE
  useEffect(() => {
    if (requestCondition) {
      if (requestCondition.length > 1) {
        setShowBackButton(true);
      }
    }
  }, [requestCondition]);

  useEffect(() => {
    if (requestCondition) {
      for (let i = 0; i < requestCondition.length; i++) {
        if (requestCondition[i].neaxtSate === 1000) {
          setSendOrConfirmButton(true);
          break;
        }
      }
    }
  }, [requestCondition]);

  useEffect(() => {
    console.log(sendOrConfirmButton);
  }, [sendOrConfirmButton]);

  const content = (
    <>
      <section className="flex-col">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline"></span> اطلاعات درخواست
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

        <div>
          <TabContext value={value}>
            <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
              <TabList onChange={handleChange} aria-label="tabs">
                <Tab label="درخواست" value="1" />
                <Tab label="پیوست ها" value="2" />
                <Tab label="تاریخچه" value="3" />
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                padding: "0",
              }}
            >
              <RequestInfoForm setRequestCondition={setRequestCondition} />
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                padding: "0",
              }}
            >
              <RequestAttachmentsSection />
            </TabPanel>
            <TabPanel
              value="3"
              sx={{
                padding: "0",
              }}
            >
              <RequestHistorySection />
            </TabPanel>
          </TabContext>
        </div>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <Button
            dir="ltr"
            endIcon={<PrintIcon />}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "Vazir" }}
          >
            <span>چاپ</span>
          </Button>
          <Button
            dir="ltr"
            endIcon={sendOrConfirmButton ? <DoneIcon /> : <SendIcon />}
            onClick={handleShowSendRequestModal}
            variant="contained"
            color="success"
            sx={{ fontFamily: "Vazir" }}
          >
            <span>
              {sendOrConfirmButton ? "تایید درخواست" : "ارسال درخواست"}
            </span>
          </Button>
          {showBackButton && (
            <Button
              dir="ltr"
              endIcon={<ReturnIcon />}
              onClick={handleShowReturnRequestModal}
              variant="contained"
              color="warning"
              sx={{ fontFamily: "Vazir" }}
            >
              <span>برگشت درخواست</span>
            </Button>
          )}
        </div>
      </section>

      {showSendRequestModal ? (
        <Modal
          title="ارسال درخواست"
          closeModal={() => setShowSendRequestModal(false)}
        >
          <p className="paragraph-primary">کارشناس مورد نظر را انتخاب کنید</p>

          <SendRequestFrom setShowSendRequestModal={setShowSendRequestModal} />
        </Modal>
      ) : showReturnRequestModal ? (
        <Modal
          title="برگشت درخواست"
          closeModal={() => setShowReturnRequestModal(false)}
        >
          <p className="paragraph-primary">کارشناس مورد نظر را انتخاب کنید</p>

          <ReturnRequestForm
            setShowReturnRequestModal={setShowReturnRequestModal}
          />
        </Modal>
      ) : null}
    </>
  );

  return content;
}

export default RequestScreen;
