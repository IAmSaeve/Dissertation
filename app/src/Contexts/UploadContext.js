/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import { WebFileStream } from "@cubbit/web-file-stream";
import Enigma from "@cubbit/enigma";
import crypto2 from "crypto";
import { pipeline, PassThrough } from "stream";

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
        const aes = await new Enigma.AES().init();
        const iv = Enigma.Random.bytes(16);
        const pass = new PassThrough();
        // const socket = new WebSocket("wss://echo.websocket.org/"); // Test socket
        const socket = new WebSocket("ws://localhost:3001/ws"); // Test socket

        for (let index = 0; index < this.state.files.length; index++) {
            socket.onopen = () => {
            const file = this.state.files[index];
            const fileStream = WebFileStream.create_read_stream(file, {chunk_size: 1024000});

            socket.onerror = (e) => console.log(e);
            socket.onclose = (c) => console.log("c", c);
            // socket.onmessage = (m) => {console.log(m);}
            pass.on("data", (chunk) => { 
                aes.encrypt(chunk, iv).then(v => {socket.send(v.content)});
            });

            pass.on("end", () => {
               var refreshinterval = setInterval(() => {
                    if (socket.bufferedAmount == 0) {
                        socket.close();
                        clearInterval(refreshinterval);
                    }
                }, 1000);
            });

            fileStream.pipe(pass);
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