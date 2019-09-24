import React from 'react';

const Modal = ({ children, show, title, onClose, footer }) => {
  return (
    <div
      className={show ? "modal fade show" : "modal fade"}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {footer ? (
            <div className="modal-footer">
              <button type="button" className="btn btn-success">
                Send message
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
