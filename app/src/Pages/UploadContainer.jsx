import React, { Component } from "react";
import UploadFiles from "./UploadFiles";
import Upload from "./Upload";
import Modal from "./Modal";
import { UploadContext } from "../Contexts/UploadContext";
import Spinner from "./Spinner";
/**
 * This class is a container 
 */
class UploadContainer extends Component {
  static contextType = UploadContext;
  render() {
    const { hideModal, show, url, copy, popupstate, SpinnerActive, percentage } = this.context;
    return (
      <div className="centerdiv flex__container">
        <Spinner SpinnerActive={SpinnerActive} percentage={percentage} />
        <Modal hideModal={hideModal} show={show} url={url} copy={copy} popupstate={popupstate}/>
        <UploadFiles />
        <Upload />
      </div>
    );
  }
}

export default UploadContainer;