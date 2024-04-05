// mui imports
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function Modal({ title, closeModal, children }) {
  const content = (
    <>
      <section className="Modal">
        <div className="Modal__close">
          <IconButton color="error" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="Modal__header">
          <h4 className="title-secondary">{title}</h4>
        </div>

        <div className="Modal__body">{children}</div>
      </section>
      <div className="overlay"></div>
    </>
  );

  return content;
}

export default Modal;
