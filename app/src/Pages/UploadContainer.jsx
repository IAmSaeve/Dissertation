import React, { Component } from "react";
import UploadFiles from "./UploadFiles";
import Upload from "./Upload";
/**
 * This class is a container 
 */
class UploadContainer extends Component {

  render() {
    return (
        <div className="centerdiv">
          <UploadFiles/>
          <Upload />
        </div>
    );
  }
}

export default UploadContainer;