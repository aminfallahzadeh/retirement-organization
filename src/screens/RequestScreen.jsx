// react imports
import { useState } from "react";

// mui imports
import { Box, Tab, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  ArrowUpwardOutlined as SendIcon,
  Print as PrintIcon,
  Redo as RedoIcon,
} from "@mui/icons-material";

// components
import RequestAttachmentsSection from "../sections/request/RequestAttachmentsSection";
import RequestHistorySection from "../sections/request/RequestHistorySection";
import RequestInfoForm from "../forms/RequestInfoForm";
import SendRequestFrom from "../forms/SendRequestForm";
import Modal from "../components/Modal";

function RequestScreen() {
  const [value, setValue] = useState("1");

  // MODAL STATES
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const [returenRequestModal, setReturenRequestModal] = useState(false);

  // HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowSendRequestModal = () => {
    setShowSendRequestModal(true);
  };

  const handleReturnRequestModal = () => {
    setReturenRequestModal(true);
  };

  const content = (
    <>
      <section className="flex-col">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline"></span> اطلاعات درخواست
          </h4>
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
            <span>ارسال</span>
          </Button>
          <Button
            dir="ltr"
            endIcon={<RedoIcon />}
            variant="contained"
            color="warning"
            sx={{ fontFamily: "Vazir" }}
          >
            <span>برگشت</span>
          </Button>
        </div>
      </section>

      {showSendRequestModal ? (
        <Modal
          title="ارسال درخواست"
          closeModal={() => setShowSendRequestModal(false)}
        >
          <p className="paragraph-primary">
            کارشناس مورد نظر خود را انتخاب کنید
          </p>

          <SendRequestFrom />
        </Modal>
      ) : null}
    </>
  );

  return content;
}

export default RequestScreen;
