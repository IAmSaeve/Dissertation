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
        this.onRemove = this.Remove.bind(this);
    }



    onChange = (event) => {
        event.persist()
        if (0 < event.target.files.length) {
            for (let index = 0; index < event.target.files.length; index++) {
                this.setState(prevState => ({
                    files: prevState.files.concat(event.target.files[index])
                }));
            }
        }


    }

    onSubmit = () => {
        // submit the data to the server
        console.log(this.state.files);
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        console.log(data.get('file'));
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
                    <input
                        id="upload"
                        type="file"
                        name="file"
                        onChange={this.onChange}
                        on
                        multiple
                    />
                    <button onClick={this.onSubmit} type="submit">Submit</button>
                </form>
                <div className="Files">
                    {
                        this.state.files.map(file => {
                            return (
                                <div key={file.name} className="Row">
                                    <span className="Filename">{file.name}</span>
                                    <button onClick={this.onRemove.bind(this, file)}>Remove</button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Upload;