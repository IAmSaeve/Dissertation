/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import { WebFileStream } from "@cubbit/web-file-stream";
import Enigma from "@cubbit/enigma";
import {encrypt} from "chacha20";
import crypto2 from "crypto";

// TODO: Move somewhere else.
// This is async and does not really belong here.
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
                    })
                    );
                }
            }
            resolve(event);
        });

    /**
     * Chaining all the promises. 
     */
    onSubmit = async (event) => {
        event.preventDefault();

        // TODO: Figure out why this line, in this method, causes a halt after 1 run.
        // await Enigma.init();
        // const nonce = new Int8Array([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
        const nonce = Buffer.from([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
        const key = Buffer.from("12345678901234567890123456789012");
        // const key = "password123";
        const socket = new WebSocket("ws://localhost:3001/ws");

        for (let index = 0; index < this.state.files.length; index++) {
            socket.onopen = () => {
                const file = this.state.files[index];
                const fileStream = WebFileStream.create_read_stream(file, { chunk_size: 64000 });
                var aes = crypto2.createCipheriv("aes-256-gcm", key, nonce);
                //aes.setAAD(Buffer.from([43, 123, 203, 59, 111, 24, 115, 237, 224, 117, 150, 53, 46, 234, 82, 215]));

                socket.send(JSON.stringify({ fileName: file.name }));

                socket.onerror = (e) => console.log(e);
                socket.onmessage = (m) => { console.log(m); };
                
                fileStream.on("data", (chunk) => {
                    // console.log(aes.update(Buffer.from(chunk)));
                    socket.send(aes.update(Buffer.from(chunk)));
                });

                fileStream.on("end", () => {
                   aes.final();
                    console.log(aes.getAuthTag());
                   socket.send(JSON.stringify({ authTag: aes.getAuthTag() }));
                    var refreshinterval = setInterval(() => {
                        if (socket.bufferedAmount === 0) {
                            
                            socket.close();
                            clearInterval(refreshinterval);
                        }
                    }, 1000);
                });
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
        var array = [...this.state.files]; // make a separate copy of the array.
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