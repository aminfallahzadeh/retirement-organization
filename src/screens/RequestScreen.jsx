// react imports
import { useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

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
import RequestInfoSection from "../sections/request/RequestInfoSection";

// helpers
import { findById } from "../helper.js";

function RequestScreen() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const requests = JSON.parse(sessionStorage.getItem("requests"));

  const body = findById(requests, id).body;

  const content = (
    <section className="main flex-col">
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
            <RequestInfoSection body={body} />
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
