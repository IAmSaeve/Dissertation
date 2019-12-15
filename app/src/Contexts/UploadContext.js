/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import { encrypt } from "chacha20";

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
            event.persist();

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
        this.fileHandler(this.state.files).then(files => {
            this.encryptFile(files).then(encfiles => {
                const data = new FormData();

                for (let index = 0; index < encfiles.length; index++) {

                    console.log("BLOB", new Blob([encfiles[index]]));

                    data.append("file", new Blob([encfiles[index]]), this.state.files[index].name);

                }

                // TODO: Show upload progress
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3001/upload", true);
                //xhr.setRequestHeader("Content-Type", "multipart/form-data");
                /*xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + "% uploaded");
                    }
                };
                xhr.onload = function () {
                  if (this.status === 200) {
                    var res = JSON.parse(this.response);
                    console.log("Server got:", res);
                  }
                };
                //console.log(data.get("file"));
                // console.log(data);*/
                xhr.send(data);
            });
        });
    }

    // This cannot be optimized unless we use plain streams all around
    // TODO: Report progress to frontend. Fix Window not responding for large files
    async fileHandler(fileArray) {
        const fileBuffers = await Promise.all([].map.call(fileArray, (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(Buffer.from(reader.result));
                };
                reader.onprogress = (p) => { console.log(`${file.name}:`, `${Math.round(p.loaded / p.total * 100)}% loaded`); };
                reader.readAsArrayBuffer(file);
            });
        }));
        return fileBuffers;
    }

    // This cannot be optimized unless we use plain streams all around
    // TODO: Report progress to frontend. Fix Window not responding for large files
    // TODO: Implement userpasswords
    async encryptFile(fileArray) {
        const encryptedFiles = await Promise.all([].map.call(fileArray, (file) => {
            return new Promise((resolve) => {
                const nonce = new Int8Array([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
                const key = "password123";
                const encData = encrypt(key, nonce, file);
                resolve(encData);
            });
        }));
        return encryptedFiles;
    }


    /**
     * Function that removes the file selected.
     * makes a separate copy of the array,
     * removes the file, from the copied array and
     * sets state equals to the new copy.
     */
    onRemove = (file) => {
        var array = [...this.state.files]; // make a separate copy of the array.
        var index = array.indexOf(file);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ files: array });
        }
        // console.log(this.state.files);
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