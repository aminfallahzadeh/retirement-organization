// react imports
import { useState } from "react";

// mui imports
import { Box, Tab, Button } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Save as SaveIcon,
  Outbox as OutboxIcon,
  Print as PrintIcon,
  Redo as RedoIcon,
} from "@mui/icons-material";

// components
import RequestAttachmentsSection from "../sections/request/RequestAttachmentsSection";
import RequestHistorySection from "../sections/request/RequestHistorySection";
import RequestInfoForm from "../forms/RequestInfoForm";

function RequestScreen() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
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
          sx={{ fontFamily: "sahel" }}
        >
          <span>چاپ</span>
        </Button>
        <Button
          dir="ltr"
          endIcon={<OutboxIcon />}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ارسال</span>
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
        <Button
          dir="ltr"
          endIcon={<RedoIcon />}
          variant="contained"
          color="warning"
          sx={{ fontFamily: "sahel" }}
        >
          <span>برگشت</span>
        </Button>
      </div>
    </section>
  );

  return content;
}

export default RequestScreen;
