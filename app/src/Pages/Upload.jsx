import React, { Component } from "react";
import { UploadContext } from "../Contexts/UploadContext";

/**
 * Class responsible for the formdata and submitting events.
 */
class Upload extends Component {
  // Creates a context
  static contextType = UploadContext;
  render() {
    // Establishes what from the context to use
    const { onSubmit, onChange, files } = this.context;
    const showHideClassName = files.length > 0 ? "button" : "button hidden";
    return (
      <>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <label className="button">
            <input
              id="input"
              className="hidden"
              type="file"
              onChange={(event) => onChange(event)}
              multiple
            />
            Choose file
            </label>
          <input className={showHideClassName} type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Upload;