/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    /**
     * Function that is turned into a promise.
     * adding the newly selected files to state.
     */
    onChange = (event) => 
     new Promise((resolve) =>{
        event.persist()
        if (0 < event.target.files.length) {
            for (let index = 0; index < event.target.files.length; index++) {
                this.setState(prevState => ({
                    files: prevState.files.concat(event.target.files[index])
                })
                );
            }
        }
    resolve(event);
    });
    /**
     * Function that adds all the selected files, to 
     * a formdata and sends data to the server.
     */
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.files);
        const data = new FormData()
        for (let index = 0; index < this.state.files.length; index++) {
            data.append('file' + index.toString(), this.state.files[index])
            console.log(index, data.get('file' + index));
        }

    }
    /**
     * Function that removes the file selected.
     * makes a separate copy of the array,
     * removes the file, from the copied array and 
     * sets state equals to the new copy.
     */
    onRemove = (file) => {
        // submit the data to the server
        var array = [...this.state.files]; // make a separate copy of the array
        var index = array.indexOf(file)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ files: array });
        }
        console.log(this.state.files);
    }

    render() {

        return (
            <div>
                <form id="myForm" encType="multipart/form-data">
                    <label > Select here
                    <input
                            id="upload"
                            type="file"
                            key={this.state.inputKey}
                            onClick={this.clear}
                            //sets the input field to null
                            onChange={(event) => this.onChange(event).then(event =>event.target.value=null)}
                            multiple
                        />
                    </label>
                    <button onClick={this.onSubmit} type="submit">Submit</button>
                </form>

               
                <div className="Files">
                    {
                        //TODO: maybe export this into another component?
                        this.state.files.map(file => {
                            if (this.state.files !== 0) {
                                return (
                                    <div key={file.name} className="Row">
                                        <span className="Filename">{file.name}</span>
                                        <button onClick={this.onRemove.bind(this, file)}>Remove</button>
                                    </div>
                                );
                            } else {
                                return null
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Upload;