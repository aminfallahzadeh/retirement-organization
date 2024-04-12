// react imports
import { useState } from "react";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// component imports
import RetiredRelatedInfoGrid from "../../grids/RetiredRelatedInfoGrid";
import RetiredStatementGrid from "../../grids/RetiredStatementGrid";

function RelatedInfoSection() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="u-margin-top-lg u-margin-bottom-lg">
      <TabContext value={value}>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            variant="fullWidth"
          >
            <Tab label="وابسته" value="1" />
            <Tab label="احکام" value="2" />
            <Tab label="فیش حقوقی" value="3" />
            <Tab label="رفاهی" value="4" />
            <Tab label="مالی" value="5" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            padding: "0",
          }}
        >
          <RetiredRelatedInfoGrid />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            padding: "0",
          }}
        >
          <RetiredStatementGrid />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            padding: "0",
          }}
        >
          Grid 3
        </TabPanel>
      </TabContext>
    </section>
  );

  return content;
}

export default RelatedInfoSection;
