// react imports
import { useState } from "react";

// mui imports
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// compoenents
import PersonnelStatementGrid from "../../grids/PersonnelStatementGrid";
import PersonnelFractionGrid from "../../grids/PersonnelFractionGrid";
import PersonnelTariffGrid from "../../grids/PersonnelTariffGrid";

function PersonnelGridsSection() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="u-margin-top-lg">
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
          <PersonnelStatementGrid />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            padding: "0",
          }}
        >
          <div className="flex-col">
            <PersonnelTariffGrid />
            <PersonnelFractionGrid />
          </div>
        </TabPanel>
      </TabContext>
    </section>
  );

  return content;
}

export default PersonnelGridsSection;
