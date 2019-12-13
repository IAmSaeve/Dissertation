/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import crypto2 from "crypto";
import chacha20 from "chacha20";
import { Readable, Writable } from "stream";

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
            // console.log(files[0]);
             this.encryptFile(files).then(encfiles => {
                 const data = new FormData();
                
                 for (let index = 0; index < encfiles.length; index++) {
 
                     console.log("BLOB", new Blob([encfiles[index]]));
                     
                     data.append("file", new Blob([encfiles[index]]), this.state.files[index].name);
                     
                 }
 
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
    fileHandler(fileArray) {
        return Promise.all([].map.call(fileArray, function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    console.log("RESULT", reader.result);
                    resolve({ result: reader.result, file: file });
                };
                reader.readAsArrayBuffer(file);
            });
        })).then(function (results) {
            return results;
        });
    }

    // FIXME: This needs optimizing
    async encryptFile(fileArray) {
        const results = await Promise.all([].map.call(fileArray, function (file) {
            return new Promise((resolve) => {
                const initVect = crypto2.randomBytes(16);
                // const CIPHER_KEY = Buffer.from("12345678901234567890123456789012");
                const readable = new Readable();
                const encrypted = new Writable();
                // const aes = crypto2.createCipheriv("aes-256-ctr", CIPHER_KEY, initVect);
                const buffer = Buffer.from((file.result));
                

                console.log("FILEARRAY", fileArray[0].result);

                readable.on("data", data => {
                    console.log("UENCDATA", data);
                    const startTimeBuffer1 = performance.now();
                    encrypted.write(chacha20.encrypt("password123", initVect, data));
                    const durationBuffer1 = performance.now() - startTimeBuffer1;
                    console.log(`Encrypt took ${durationBuffer1}ms`);
                });

                encrypted._write = (d) => {
                    resolve(d);
                };
                readable._read = () => { };
                readable.push(buffer);
                // readable.push(null);
                
                // readable.pipe(aes).pipe(encrypted);

            });
        }));
        console.log(results);
        return results;
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