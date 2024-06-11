// mui imports
import { IconButton } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

function Modal({ title, closeModal, children }) {
  const content = (
    <>
      <section className="modal">
        <div className="modal__header">
          {closeModal && (
            <div className="modal__close">
              <IconButton color="error" onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
          <div className="modal__title">
            <h4 className="title-secondary">{title}</h4>
          </div>
        </div>
        <div className="modal__body">{children}</div>
      </section>
      <div className="overlay"></div>
    </>
  );

  return content;
}

export default Modal;
