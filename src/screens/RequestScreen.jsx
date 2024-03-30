// react imports
import { useState } from "react";

// helpers
import { findById } from "../helper.js";

// rrd imports
import { useLocation } from "react-router-dom";

// mui imports
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// components
import RequestAttachmentsSection from "../sections/request/RequestAttachmentsSection";
import RequestHistorySection from "../sections/request/RequestHistorySection";
import RequestInfoSection from "../sections/request/RequestInfoSection";
import UserButton from "../components/UserButton";

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

      <div style={{ marginRight: "auto" }} className="flex-row">
        <UserButton variant={"outline-success"} icon={"print"}>
          &nbsp; چاپ
        </UserButton>
        <UserButton variant={"outline-success"} icon={"send"}>
          &nbsp; ارسال
        </UserButton>
        <UserButton variant={"outline-success"} icon={"done"}>
          &nbsp; ذخیره
        </UserButton>
        <UserButton variant={"outline-success"} icon={"return"}>
          &nbsp; برگشت
        </UserButton>
      </div>
    </section>
  );

  return content;
}

export default RequestScreen;
