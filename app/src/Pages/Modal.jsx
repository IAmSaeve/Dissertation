import React from "react";

const Modal = ({ hideModal, show, url, copy }) => {
  const showHideClassName = show ? "modal display-block" : "modal hidden";
  url = url.replace("http://localhost:3001/", "http://localhost:3000/");

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <span onClick={hideModal}>&#x58;</span>
        <p>Click to copy</p>
        <input onClick={(event) => copy(event)} value={url} readOnly={true}/>
      </section>
    </div>
  );
};

export default Modal;