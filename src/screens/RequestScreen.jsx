// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Tab, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// components
import RequestAttachmentsGrid from "../grids/RequestAttachmentsGrid";
import RequestInfoForm from "../forms/RequestInfoForm";
import RequestHistoryGrid from "../grids/RequestHistoryGrid";

function RequestScreen() {
  const [value, setValue] = useState("1");

  const navigate = useNavigate();

  // HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <>
      <section className="flex-col">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline"></span> اطلاعات درخواست
          </h4>

          <div style={{ marginRight: "auto" }} className="back-button">
            <Tooltip title="بازگشت">
              <span>
                <IconButton color="primary" onClick={() => navigate(-1)}>
                  <BackIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>

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
              <RequestInfoForm />
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                padding: "0",
              }}
            >
              <RequestAttachmentsGrid />
            </TabPanel>
            <TabPanel
              value="3"
              sx={{
                padding: "0",
              }}
            >
              <RequestHistoryGrid />
            </TabPanel>
          </TabContext>
        </div>
      </section>
    </>
  );

  return content;
}

export default RequestScreen;
