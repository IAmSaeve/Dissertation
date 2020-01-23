/* eslint-disable no-undef */
import React, { Component, createContext } from "react";
import { Readable } from "stream";
import Enigma from "@cubbit/enigma";

Enigma.init();

export const DownloadContext = createContext();

/**
 * Loading single with streams and decrypting
 */
class DownloadContextProvider extends Component {
    load = async (id, e) => {
        const response = await fetch(`http://localhost:3001/download/${id}`, { method: "POST" });
        if (!response.ok) throw new Error("HTTP error " + response.status);
        const nameExp = new RegExp(/"(.*)"/);
        // File extensions
        const attatchment = response.headers.get("content-disposition");
        // Authentication tag
        const authtag = response.headers.get("x-authtag");
        const type = response.headers.get("content-type");
        // Filename
        const name = nameExp.exec(attatchment)[1];
        // Decipheriv values
        const nonce = Buffer.from([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
        const key = Buffer.from("12345678901234567890123456789012");

        const enig = await new Enigma.AES().init({key: key});

        response.arrayBuffer().then(async res => {
            // Creates file stream with a fixed chunk size
            const fileStream = new Readable({ highWaterMark: 102400 });
            fileStream._read = () => { };
            fileStream.push(Buffer.from(res));
            fileStream.push(null);
            // Decrypt files stream
            let decStream = enig.decrypt_stream(nonce, Buffer.from(JSON.parse(authtag)));

            let buffer = Buffer.alloc(0);

            decStream.on("data", d => {
                buffer = Buffer.concat([buffer, d]);
                decStream.uncork();
            });

            decStream.on("end", () => {
                let file = new File([buffer], name, { type: type });
                const link = document.createElement("a");
                link.download = name;
                link.href = window.URL.createObjectURL(file);
                link.click();
                link.remove();                
            });

            fileStream.pipe(decStream);
        })
        .catch(error => {
            console.log(error);
        });
    }

    /**
     * Render the selected content to be used by child components.
     */
    render() {
        return (
            <DownloadContext.Provider value={{
                load: this.load
            }}>
                {this.props.children}
            </DownloadContext.Provider>
        );
    }
}

export default DownloadContextProvider;