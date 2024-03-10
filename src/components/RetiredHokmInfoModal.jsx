// mui imports
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

// component imports
import RetiredHokmInfoModalFormA from "./RetiredHokmInfoModalFormA";

function RetiredHokmInfoModal() {
  return (
    <section className="RetiredHokmInfoModal">
      <div className="RetiredHokmInfoModal__close">
        <IconButton color="error">
          <CloseIcon />
        </IconButton>
      </div>

      <div className="RetiredHokmInfoModal__header">
        <h4>اطلاعات حکم بازنشستگی</h4>
      </div>
      <hr />

      <div className="RetiredHokmInfoModal__form">
        <RetiredHokmInfoModalFormA />
      </div>

      <div className="RetiredHokmInfoModal__header">
        <h4>اطلاعات حکم بازنشستگی</h4>
      </div>
      <hr />
    </section>
  );
}

export default RetiredHokmInfoModal;
