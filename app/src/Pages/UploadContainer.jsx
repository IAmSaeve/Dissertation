import React, { Component } from "react";
import UploadFiles from "./UploadFiles";
import Upload from "./Upload";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { UploadContext } from "../Contexts/UploadContext";
/**
 * This class is a container 
 */
class UploadContainer extends Component {
  static contextType = UploadContext;
  render() {
    const { hideModal, show, url, copy, popupstate, SpinnerActive } = this.context;
    return (
      <div className="centerdiv flex__container">
        <Spinner SpinnerActive={SpinnerActive} />
        <Modal hideModal={hideModal} show={show} url={url} copy={copy} popupstate={popupstate}/>
        <UploadFiles />
        <Upload />
      </div>
    );
  }
}

export default UploadContainer;