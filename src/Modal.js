import React, { useState } from "react";

import "./App.css";
const Modal = (props) => {
  const [inputValue, setInputValue] = useState(null);
  const onInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  if (!props.show) {
    return null;
  }
  let index = props.modalIndex;
  let gifList = props.gifList;
  let gifItem = gifList[index];
  console.log(gifItem);
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Gift some SOL</span>
        </div>
        <div className="modal-body">
          <div className="modal-body-title">
            Accepting all sorts of GIFts ;)
          </div>
          <div className="payment">
            <div className="modal-gif-item">
              <img src={gifItem.gifLink} alt={gifItem.gifLink} />
              <span
                style={{
                  color: "white",
                  paddingTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Uploaded By : {gifItem.userAddress.toString()}
              </span>
            </div>
            <div className="amount">
              <span className="solana-amount">
                {inputValue ? inputValue : 0} SOL
              </span>
              <input
                type="number"
                value={inputValue}
                onChange={onInputChange}
                placeholder="Enter SOL..."
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cta-button submit-gif-button"
            onClick={props.onClose}
          >
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
