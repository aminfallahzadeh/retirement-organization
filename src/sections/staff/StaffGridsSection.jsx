// react imports
import { useState } from "react";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// compoenents
import StaffStatementsGrid from "../../grids/StaffStatementsGrid";

function StaffGridsSection() {
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
            <Tab label="احکام" value="1" />
            <Tab label="تعرفه" value="2" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            padding: "0",
          }}
        >
          <StaffStatementsGrid />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            padding: "0",
          }}
        >
          Tarefe
        </TabPanel>
      </TabContext>
    </section>
  );

  return content;
}

export default StaffGridsSection;
