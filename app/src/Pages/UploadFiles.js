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
                            <div key={file.name} className="fileDiv">
                                <span className="Filename">name: {file.name}</span>
                                <span className="Filename">size: {file.size}.kb</span>
                                <i onClick={()=>onRemove(file)} className="fas fa-minus-circle"></i>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Uploadfiles;