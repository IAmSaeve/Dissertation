/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import { WebFileStream } from "@cubbit/web-file-stream";
import Enigma from "@cubbit/enigma";

Enigma.init();

export const UploadContext = createContext();

/**
 * Class responsible for handeling state of the upload content
 */
class UploadContextProvider extends Component {
    state = {
        files: [],
    };

    /**
     * Adds newly selected files to the allready selected files.
     */
    onChange = (event) =>
        new Promise((resolve) => {
            event.persist();
            if (0 < event.target.files.length) {
                for (let index = 0; index < event.target.files.length; index++) {
                    this.setState(prevState => ({
                        files: prevState.files.concat(event.target.files[index])
                    }));
                }
            }
            resolve(event);
        });

    /**
     * OnSubmit streams the file from state to the server via socket connect.
     * while streaming the data, each data chunk gets encrypted. 
     */
    onSubmit = async (event) => {
        event.preventDefault();
        // Encrypt values
        const nonce = Buffer.from([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
        const key = Buffer.from("12345678901234567890123456789012");
        // Establishes socket connection
        const socket = new WebSocket("ws://localhost:3001/ws");
        const enig = await new Enigma.AES().init({key: key});

        for (let index = 0; index < this.state.files.length; index++) {
            socket.onopen = () => {
                const file = this.state.files[index];
                const fileStream = WebFileStream.create_read_stream(file, { chunk_size: 102400 });
                let encStream = enig.encrypt_stream(nonce);

                socket.send(JSON.stringify({ fileName: file.name }));

                socket.onerror = (e) => console.log(e);
                socket.onmessage = (m) => { console.log(m); };

                encStream.on("data", (chunk) => {
                    socket.send(chunk);
                });

                encStream.on("end", () => {
                    socket.send(JSON.stringify({ authTag: encStream.getAuthTag() }));
                    var refreshinterval = setInterval(() => {
                        if (socket.bufferedAmount === 0) {
                            socket.close();
                            console.log("Done uploading");
                            clearInterval(refreshinterval);
                        }
                    }, 1000);
                });

                fileStream.pipe(encStream);
            };
        }
    }

    /**
     * Function that removes the file selected.
     * makes a separate copy of the array,
     * removes the file, from the copied array and
     * sets state equals to the new copy.
     */
    onRemove = (file) => {
        var array = [...this.state.files];
        var index = array.indexOf(file);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ files: array });
        }
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