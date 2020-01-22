import React, { Component } from "react";
import { UploadContext } from "../Contexts/UploadContext";
/**
 * Class responsible for displaying selected and deselectfiles
 */
class Uploadfiles extends Component {
  // creates a context
  static contextType = UploadContext;

  bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }
  LimitString = (word) => {
    if (word.length > 12) return word.substr(0, 12) + "..";
    return word;
  }
  render() {
    //establishes what from the context to use
    const { files, onRemove } = this.context;
    return (
      <div className="uploadFiles">
        <div>
          <p>Filename</p>
          <p>File size</p>
          <span></span>
        </div>
        {
          files.map((file, index) => {
            return (
              <div key={index} className="fileDiv">
                <p>{this.LimitString(file.name)}</p>
                <p>{this.bytesToSize(file.size)}</p>
                <p onClick={() => onRemove(file)}>&#x58;</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Uploadfiles;