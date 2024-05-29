// mui imports
import { IconButton } from "@mui/material";
import {
  CloseOutlined as CloseIcon,
  ErrorOutlineOutlined as ErrorIcon,
} from "@mui/icons-material";

function Modal({ title, closeModal, children, mode }) {
  const content = (
    <>
      <section className="modal">
        <div className="moda__icons">
          {closeModal && (
            <IconButton color="error" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          )}

          {mode === "warning" ? <ErrorIcon color="warning" /> : null}
        </div>

        <div className="modal__header">
          <h4 className="title-secondary">{title}</h4>
        </div>
        <div className="modal__body">{children}</div>
      </section>
      <div className="overlay"></div>
    </>
  );

  return content;
}

export default Modal;
