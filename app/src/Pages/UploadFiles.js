/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { UploadContext } from "../Contexts/UploadContext";
/**
 * Class responsible for displaying selected and deselectfiles
 */
class Uploadfiles extends Component {
    // creates a context
    static contextType = UploadContext;
    render() {
        //establishes what from the context to use
        const { files, onRemove } = this.context;
        return (
            <div className="uploadFiles">
                {
                    files.map(file => {
                        return (
                            <div key={file.name} className="Row">
                                <span className="Filename">{file.name}</span>
                                <button onClick={()=>onRemove(file)}>Remove</button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Uploadfiles;