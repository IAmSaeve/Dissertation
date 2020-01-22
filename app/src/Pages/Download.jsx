/* eslint-disable no-undef */
import React from "react";
import Enigma from "@cubbit/enigma";
import { WebFileStream } from "@cubbit/web-file-stream";
import {decrypt} from "chacha20";
import crypto2 from "crypto";
import { PassThrough } from "stream";


async function load(id, e) {
  const response = await fetch(`http://localhost:3001/download/${id}`, { method: "POST" });
  if (!response.ok) throw new Error("HTTP error " + response.status);
  const nameExp = new RegExp(/"(.*)"/);
  const attatchment = response.headers.get("content-disposition");
  const authtag = response.headers.get("x-authtag");
  const type = response.headers.get("content-type");
  const name = nameExp.exec(attatchment)[1];
 
  response.arrayBuffer().then(async res => {

    // const nonce = new Int8Array([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
    // const key = "password123";
    const nonce = Buffer.from([73, 101, 161, 17, 719, 239, 52, 16, 21, 802, 361, 41, 9, 21, 92, 119, 488]);
    const key = Buffer.from("12345678901234567890123456789012");
    var file = new File([res], name, { type: type });
    const fileStream = WebFileStream.create_read_stream(file, { chunk_size: 64000 });
    var aes = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
    aes.setAuthTag(Buffer.from(JSON.parse(authtag)));
    let x = Buffer.alloc(0);
    fileStream.on("data", chunk => {
      // console.log(decrypt(key, nonce, chunk));
      // x += aes.update(chunk);
    });

    const pass = new PassThrough();
    pass.on("data", d => {
      x = Buffer.concat([x, d])
    })
    pass.on("end", () => {
      var final = new File([x], name, { type: type });
      const link = document.createElement("a");
      link.download = name;
      link.href = window.URL.createObjectURL(final);
      link.click();
      link.remove();
    })
    fileStream.pipe(aes).pipe(pass)

    aes.on("end", () => {
      // console.log(x)
      // var final = new File([x], name, { type: type });
      // const link = document.createElement("a");
      // link.download = name;
      // link.href = window.URL.createObjectURL(final);
      // link.click();
      // link.remove();
    });


  })
    .catch(error => {
      console.log(error);
    });
}

class Download extends React.Component {
  render() {
    return (
      <div>
        <button onClick={(e) => load(this.props.match.params.id, e)}>Download</button>
        <pre>{this.props.match.params.id}</pre>
      </div>
    );
  }
}

export default Download;