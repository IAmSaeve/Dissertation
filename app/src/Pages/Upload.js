/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { UploadContext } from "../Contexts/UploadContext";
import UploadFiles from "./UploadFiles";

class Upload extends Component {
    static contextType = UploadContext;
    render() {
        const { onSubmit, onChange } = this.context;
        return (
            <div>
                <form id="myForm" encType="multipart/form-data">
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