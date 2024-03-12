// mui imports
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function Modal({ title, showModal, closeModal, children }) {
  const modalContent = (
    <section className="Modal">
      <div className="Modal__close">
        <IconButton color="error" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="Modal__header">
        <h4>{title}</h4>
      </div>
      <hr />

      <div className="Modal__body">{children}</div>
    </section>
  );

  return (
    <div>
      {showModal && <div className="Overlay"></div>}
      {showModal && modalContent}
    </div>
  );
}

export default Modal;
