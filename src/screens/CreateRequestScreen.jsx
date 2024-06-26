// react imports
import { useState } from "react";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// components
import CreateRequestForm from "../forms/CreateRequestForm";

function CreateRequestScreen() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>ایجاد درخواست
        </h4>
      </div>

      <div>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="اطلاعات درخواست" value="1" />
              <Tab label="پیوست ها" value="2" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "0",
            }}
          >
            <CreateRequestForm />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0",
            }}
          >
            Test
          </TabPanel>
        </TabContext>
      </div>
    </section>
  );

  return content;
}

export default CreateRequestScreen;
