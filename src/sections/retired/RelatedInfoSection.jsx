// react imports
import { useState } from "react";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// component imports
import RetiredRelatedInfoGrid from "../../grids/RetiredRelatedInfoGrid";
import RetiredStatementsGrid from "../../grids/RetiredStatementsGrid";
import RetiredHeirGrid from "../../grids/RetiredHeirGrid";

function RelatedInfoSection() {
  const [value, setValue] = useState("1");

  const { personObject } = useSelector((state) => state.retiredState);
  const death = personObject?.personDeathDate;

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
            <Tab label={death ? "موظفین" : "وابستگان"} value="1" />
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
          {death ? <RetiredHeirGrid /> : <RetiredRelatedInfoGrid />}
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            padding: "0",
          }}
        >
          <RetiredStatementsGrid />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            padding: "0",
          }}
        >
          grid
        </TabPanel>
      </TabContext>
    </section>
  );

  return content;
}

export default RelatedInfoSection;
