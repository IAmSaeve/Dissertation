import React, { Component } from "react";
import { UploadContext } from "../Contexts/UploadContext";

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
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <label className="button">
            <input
              className="hidden"
              type="file"
              onChange={(event) => onChange(event)}
              multiple
            />
            Choose file
            </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Upload;