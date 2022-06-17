import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = ({
  title,
  width,
  height,
  primaryButtonLabel = "Submit",
  primaryButtonFn,
  secondaryButtonLabel,
  secondaryButtonFn,
  children,
  setOpenModal,
}) => {
  const modalWidth = `${width}px`;
  const modalHeight = `${height}px`;

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div
        className="modal-content"
        style={{ width: modalWidth, height: modalHeight }}
      >
        <div className="close-btn" onClick={() => setOpenModal(undefined)}>
          +
        </div>
        <h1 className="modal-header">{title}</h1>
        <div className="modal-form">{children}</div>
        <div className="modal-footer">
          <div className="btn-container">
            {secondaryButtonLabel && (
              <button className="secondary-button">
                {secondaryButtonLabel}
              </button>
            )}
            <button className="primary-button">{primaryButtonLabel}</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

Modal.prototype = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  primaryButtonFn: PropTypes.func,
  primaryButtonLabel: PropTypes.string,
  secondaryButtonFn: PropTypes.func,
  secondaryButtonLabel: PropTypes.string,
  setOpenModal: PropTypes.func.isRequired,
};

export default Modal;
