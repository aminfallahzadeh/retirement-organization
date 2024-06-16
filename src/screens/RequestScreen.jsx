// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Tab, Button, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  ArrowUpwardOutlined as SendIcon,
  Print as PrintIcon,
  Redo as RedoIcon,
  ArrowBack as BackIcon,
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

  // MODAL STATES
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const [showReturnRequestModal, setShowReturnRequestModal] = useState(false);

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
              <RequestInfoForm />
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
            endIcon={<SendIcon />}
            onClick={handleShowSendRequestModal}
            variant="contained"
            color="success"
            sx={{ fontFamily: "Vazir" }}
          >
            <span>ارسال درخواست</span>
          </Button>
          <Button
            dir="ltr"
            endIcon={<RedoIcon />}
            onClick={handleShowReturnRequestModal}
            variant="contained"
            color="warning"
            sx={{ fontFamily: "Vazir" }}
          >
            <span>برگشت درخواست</span>
          </Button>
        </div>
      </section>

      {showSendRequestModal ? (
        <Modal
          title="ارسال درخواست"
          closeModal={() => setShowSendRequestModal(false)}
        >
          <p className="paragraph-primary">کارشناس مورد نظر را انتخاب کنید</p>

          <SendRequestFrom />
        </Modal>
      ) : showReturnRequestModal ? (
        <Modal
          title="برگشت درخواست"
          closeModal={() => setShowReturnRequestModal(false)}
        >
          <p className="paragraph-primary">کارشناس مورد نظر را انتخاب کنید</p>

          <ReturnRequestForm />
        </Modal>
      ) : null}
    </>
  );

  return content;
}

export default RequestScreen;
