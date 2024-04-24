// react imports
import { useState } from "react";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// component imports
import RetiredRelatedGrid from "../../grids/RetiredRelatedGrid";
import RetiredStatementsGrid from "../../grids/RetiredStatementsGrid";
import RetiredHeirGrid from "../../grids/RetiredHeirGrid";
import AllRequestsGrid from "../../grids/AllRequestsGrid";

function RelatedInfoSection() {
  const [value, setValue] = useState("1");

  const { personDeathDate } = useSelector((state) => state.retiredState);

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
            <Tab label={personDeathDate ? "موظفین" : "وابستگان"} value="1" />
            <Tab label="احکام" value="2" />
            <Tab label="فیش حقوقی" value="3" />
            <Tab label="درخواست ها" value="4" />
            <Tab label="مالی" value="5" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            padding: "0",
          }}
        >
          {personDeathDate ? <RetiredHeirGrid /> : <RetiredRelatedGrid />}
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
        ></TabPanel>
        <TabPanel
          value="4"
          sx={{
            padding: "0",
          }}
        >
          <AllRequestsGrid />
        </TabPanel>
        <TabPanel
          value="5"
          sx={{
            padding: "0",
          }}
        >
          mali
        </TabPanel>
      </TabContext>
    </section>
  );

  return content;
}

export default RelatedInfoSection;
