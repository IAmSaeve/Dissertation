import React, { Component } from "react";
import { UploadContext } from "../Contexts/UploadContext";
import UploadFiles from "./UploadFiles";
/**
 * Class responsible for the formdata and submitting events.
 */
class Upload extends Component {
  // creates a context
  static contextType = UploadContext;
  render() {
    //establishes what from the context to use
    const { onSubmit, onChange } = this.context;
    return (
      <>
        <div className="centerdiv">
          <UploadFiles />
          <form onSubmit={onSubmit} id="uploadForm" encType="multipart/form-data">
            <label className="button buttonPostion" >
              <input
                id="upload"
                type="file"
                //sets the input field to null
                onChange={(event) => onChange(event).then(event => event.target.value = null)}
                multiple
              />
              Choose file here
                    </label>
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}

export default Upload;