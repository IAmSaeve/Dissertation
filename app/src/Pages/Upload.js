/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
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
            <div>
                <form id="uploadForm" encType="multipart/form-data">
                    <label > Select here
                    <input
                            id="upload"
                            type="file"
                            //sets the input field to null
                            onChange={(event) => onChange(event).then(event => event.target.value = null)}
                            multiple
                        />
                    </label>
                    <button onClick={onSubmit} type="submit">Submit</button>
                </form>
                <UploadFiles />
            </div>
        );
    }
}

export default Upload;