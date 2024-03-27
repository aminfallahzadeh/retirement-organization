import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="fullWidth"
        >
          <Tab label="وابسته" value="1" />
          <Tab label="احکام" value="2" />
          <Tab label="فیش حقوقی" value="3" />
          <Tab label="رفاهی" value="4" />
          <Tab label="مالی" value="5" />
        </TabList>
      </Box>
      {/* <TabPanel value="1">Item One</TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
      <TabPanel value="3">Item Three</TabPanel> */}
    </TabContext>
  );
}
