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

    clear = (event) => {
        event.target.value = null;
    }

    onChange = (event) => {
        event.preventDefault();
        event.persist()
        if (0 < event.target.files.length) {
            for (let index = 0; index < event.target.files.length; index++) {
                this.setState(prevState => ({
                    files: prevState.files.concat(event.target.files[index])
                })
                );
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        // submit the data to the server
        console.log(this.state.files);
        const data = new FormData()
        for (let index = 0; index < this.state.files.length; index++) {
            data.append('file' + index.toString(), this.state.files[index])
            console.log(index, data.get('file' + index));
        }

    }

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
                            onChange={(event) => this.onChange(event)}
                            multiple
                        />
                    </label>
                    <button onClick={this.onSubmit} type="submit">Submit</button>
                </form>
                <div className="Files">
                    {
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