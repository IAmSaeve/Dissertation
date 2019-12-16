import React, { Component } from "react";
import { UploadContext } from "../Contexts/UploadContext";
/**
 * Class responsible for displaying selected and deselectfiles
 */
class Uploadfiles extends Component {
  // creates a context
  static contextType = UploadContext;

  bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
 }
  render() {
    //establishes what from the context to use
    const { files, onRemove } = this.context;
    return (
      <div className="uploadFiles">
        {
          files.map(file => {
            return (
              <div key={file.name} className="fileDiv">
                <span className="Filename">name: {file.name}</span>
                <span className="Filename">size: {this.bytesToSize(file.size)}</span>
                <i onClick={() => onRemove(file)} className="fas fa-minus-circle"></i>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Uploadfiles;