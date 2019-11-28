/* eslint-disable no-unused-vars */
import React, { Component, createContext } from 'react';

export const UploadContext = createContext();

class UploadContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    onChange = (event) =>
        new Promise((resolve) => {
            event.persist()
            if (0 < event.target.files.length) {
                for (let index = 0; index < event.target.files.length; index++) {
                    this.setState(prevState => ({
                        files: prevState.files.concat(event.target.files[index])
                    })
                    );
                }
            }
            console.log(this.state.files);
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
            <UploadContext.Provider value={{
                ...this.state,
                onRemove: this.onRemove,
                onChange: this.onChange,
                onSubmit: this.onSubmit
            }}>
                {this.props.children}
            </UploadContext.Provider>
        );
    }
}

export default UploadContextProvider;