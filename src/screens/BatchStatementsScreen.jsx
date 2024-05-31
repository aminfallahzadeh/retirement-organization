// react imports
import { useState } from "react";

// componsnets
import BatchStatementsForm from "../forms/BatchStatementsForm";
import Modal from "../components/Modal";
import BatchStatementAddItemForm from "../forms/BatchStatementAddItemForm";
import StatementDraftGrid from "../grids/StatementDraftGrid";

// mui imports
import { Button } from "@mui/material";
import {
  EditCalendar as EditCalenderIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

function BatchStatementsScreen() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showStatementDraftGrid, setShowStatementDraftGrid] = useState(false);

  const handleShowAddItemModal = () => {
    setShowAddItemModal(true);
  };

  const handleShowStatementDraftGrid = () => {
    setShowStatementDraftGrid(!showStatementDraftGrid);
  };

  const content = (
    <>
      <section className="flex-col">
        <div className="title-primary--container flex-row flex-center">
          <h4 className="title-primary">
            <span className="title-primary--underline">احکام گروهی</span>
          </h4>
        </div>

        <div>
          <BatchStatementsForm />
        </div>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <Button
            dir="ltr"
            endIcon={<AddIcon />}
            onClick={() => handleShowAddItemModal(true)}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>اضافه کردن آیتم</span>
          </Button>

          {!showStatementDraftGrid ? (
            <Button
              dir="ltr"
              endIcon={<EditCalenderIcon />}
              onClick={handleShowStatementDraftGrid}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>ایجاد پیش نویس</span>
            </Button>
          ) : (
            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={handleShowStatementDraftGrid}
              variant="contained"
              color="warning"
              sx={{ fontFamily: "sahel" }}
            >
              <span>بستن پیش نویس</span>
            </Button>
          )}
        </div>

        {showStatementDraftGrid && <StatementDraftGrid />}
      </section>
      {showAddItemModal && (
        <Modal
          title={"آیتم های احکام گروهی"}
          closeModal={() => setShowAddItemModal(false)}
        >
          <BatchStatementAddItemForm />
        </Modal>
      )}
    </>
  );
  return content;
}

export default BatchStatementsScreen;
