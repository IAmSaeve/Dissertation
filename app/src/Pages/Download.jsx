import React from "react";

async function load(id, e) {
  const response = await fetch(`http://localhost:3001/download/${id}`, { method: "POST" });
  if (!response.ok) throw new Error("HTTP error " + response.status);

  // Extract header data
  const nameExp = new RegExp(/"(.*)"/);
  const attatchment = response.headers.get("content-disposition");
  const type = response.headers.get("content-type");
  const name = nameExp.exec(attatchment)[1];

  response.blob().then(b => {
    // Forge File object
    const archive = new File([b], name, { type: type });

    // Hack to trigger download prompt
    const link = document.createElement("a");
    link.download = name;
    link.href = window.URL.createObjectURL(archive);
    link.click();
    link.remove();
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