import React from "react";

const Modal = ({ hideModal, show, url }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    url = url.replace("http://localhost:3001/", "http://localhost:3000/");

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                You can download your file below
                <br/>
                <strong><a href={url}>{url}</a></strong>
                <button onClick={hideModal}>close</button>
            </section>
        </div>
    );
};


export default Modal;