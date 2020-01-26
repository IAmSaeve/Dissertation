/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
//import { WebFileStream } from "@cubbit/web-file-stream";
import Enigma from "@cubbit/enigma";
import JSZip from "jszip";

Enigma.init();

export const UploadContext = createContext();

/**
 * Class responsible for handeling state of the upload content
 */
class UploadContextProvider extends Component {
    state = {
        files: [],
        show: false,
        url: "",
        popupstate: false,
        SpinnerActive: false
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        this.setState({ url: "" });
    };


    copy = (e) => {
        const target = e.target;

        target.select();
        target.setSelectionRange(0, 99999); /*For mobile devices*/

        document.execCommand("copy");
        this.setState({ popupstate: true });
        setTimeout(() => {
            this.setState({ popupstate: false }); 
        }, 750);

    };

    /**
     * Adds newly selected files to the allready selected files.
     */
    onChange = (event) =>
        new Promise((resolve) => {
            const target = event.target;
            const files = target.files;
            if (0 < files.length) {
                for (let index = 0; index < files.length; index++) {
                    this.setState(prevState => ({
                        files: [files[index], ...prevState.files]
                    }));
                }
            }
            resolve(target);
        }).then((target) => {
            target.value = null;
        });

    /**
     * OnSubmit streams the file from state to the server via socket connect.
     * while streaming the data, each data chunk gets encrypted. 
     */
    onSubmit = async (event) => {
        this.setState({ SpinnerActive: true });
        event.preventDefault();
        // Encrypt values
        const nonce = Buffer.from([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
        const key = Buffer.from("12345678901234567890123456789012");
        // Establishes socket connection
        const socket = new WebSocket("ws://localhost:3001/ws");
        const enig = await new Enigma.AES().init({ key: key });
        var zip = new JSZip();

        for (let index = 0; index < this.state.files.length; index++) {
            zip.file(this.state.files[index].name, this.state.files[index]);
        }

        // let content = zip.generateNodeStream();

        socket.onopen = () => {

            let encStream = enig.encrypt_stream(nonce);
            let link;
            socket.send(JSON.stringify({ fileName: "Yourfiles.zip" }));

            socket.onerror = (e) => console.log(e);
            socket.onmessage = (m) => { console.log(link = m.data); };

            encStream.on("data", (chunk) => {
                socket.send(chunk);
                encStream.uncork();
            });

            encStream.on("end", () => {
                socket.send(JSON.stringify({ authTag: encStream.getAuthTag() }));
                var refreshinterval = setInterval(() => {
                    if (socket.bufferedAmount === 0) {
                        socket.close();
                        this.setState({ url: link });
                        this.setState({ SpinnerActive: false });
                        this.showModal();
                        console.log("Done uploading");
                        clearInterval(refreshinterval);
                    }
                }, 1000);
            });

            zip.generateNodeStream({ streamFiles: true }).pipe(encStream);
        };

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
        if (index >= 0) {
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
                onSubmit: this.onSubmit,
                showModal: this.showModal,
                hideModal: this.hideModal,
                copy: this.copy,
                clearURL: this.clearURL,
            }}>
                {this.props.children}
            </UploadContext.Provider>
        );
    }
}

export default UploadContextProvider;