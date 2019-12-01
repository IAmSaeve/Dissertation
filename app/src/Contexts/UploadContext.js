import React, { Component, createContext } from 'react';

export const UploadContext = createContext();
/**
 * Class responsible for handeling state of the upload content
 */
class UploadContextProvider extends Component {

    state = {
        files: [],
    };

    onChange = (event) =>
        new Promise((resolve) => {
            event.persist()

            if (0 < event.target.files.length) {
                for (let index = 0; index < event.target.files.length; index++) {
                    console.log(event.target.files[index]);
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
        console.log("hello"); 
        console.log(this.state.files);
        const data = new FormData()
        for (let index = 0; index < this.state.files.length; index++) {
            data.append('file' + index.toString(), this.state.files[index])
            console.log(index, data.get('file' + index));
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', data, true);

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentComplete = (e.loaded / e.total) * 100;
                console.log(percentComplete + '% uploaded');
            }
        };
        xhr.onload = function () {
            if (this.status === 200) {
                var res = JSON.parse(this.response);
                console.log('Server got:', res);
            }
        };
    }
    /**
     * Function that removes the file selected.
     * makes a separate copy of the array,
     * removes the file, from the copied array and 
     * sets state equals to the new copy.
     */
    onRemove = (file) => {
        var array = [...this.state.files]; // make a separate copy of the array.
        var index = array.indexOf(file)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ files: array });
        }
        console.log(this.state.files);
    }
    /**
     * Render the selected content to be used by child components.
     */
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