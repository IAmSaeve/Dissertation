import React, { Component } from "react";
import UploadFiles from "./UploadFiles";
import Upload from "./Upload";
import Modal from "./Modal";
import { UploadContext } from "../Contexts/UploadContext";
/**
 * This class is a container 
 */
class UploadContainer extends Component {
  static contextType = UploadContext;
  render() {
    const { hideModal, show, url } = this.context;
    return (
      <div className="centerdiv flex__container">
        <Modal hideModal={hideModal} show={show} url={url}/>
        <UploadFiles />
        <Upload />
      </div>
    );
  }
}

export default UploadContainer;