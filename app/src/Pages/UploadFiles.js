/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { UploadContext } from "../Contexts/UploadContext";

class Uploadfiles extends Component {
    static contextType = UploadContext;
    render() {
        const { files, onRemove } = this.context;
        return (
            <div className="uploadFiles">
                {
                    files.map(file => {
                        return (
                            <div key={file.name} className="Row">
                                <span className="Filename">{file.name}</span>
                                <button onClick={onRemove.bind(this, file)}>Remove</button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Uploadfiles;