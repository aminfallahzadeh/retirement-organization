// react imports
import { useState } from "react";

// mui imports
import { Box, Tab } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import RequestAttachmentsSection from "../sections/request/RequestAttachmentsSection";
import RequestInfoSection from "../sections/request/RequestInfoSection";

function CreateRequestScreen() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="main flex-col">
      <div>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="درخواست" value="1" />
              <Tab label="پیوست ها" value="2" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "0",
            }}
          >
            <RequestInfoSection />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0",
            }}
          >
            <RequestAttachmentsSection />
          </TabPanel>
        </TabContext>
      </div>

      <div style={{ marginRight: "auto" }} className="flex-row">
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
    </section>
  );

  return content;
}

export default CreateRequestScreen;
