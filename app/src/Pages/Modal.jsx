import React from "react";

const Modal = ({ hideModal, show, url, copy, popupstate }) => {
  const showHideClassName = show ? "modal display-block" : "modal hidden";
  url = url.replace("http://localhost:3001/", "http://localhost:3000/");
  const popup = popupstate ? "popup" : "hidden";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <div className={popup}>Copied</div>
        <span onClick={hideModal}>&#x58;</span>
        <p>Click to copy</p>
        <input onClick={(event) => copy(event)} value={url} readOnly={true}/>
      </section>
    </div>
  );
};

export default Modal;