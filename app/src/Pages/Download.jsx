/* eslint-disable no-undef */
import React from "react";
import { DownloadContext } from "../Contexts/DownloadContext";
class Download extends React.Component {
  static contextType = DownloadContext;
  render() {
    const { load } = this.context;
    return (
      <div>
        <button onClick={(e) => load(this.props.match.params.id, e)}>Download</button>
        <pre>{this.props.match.params.id}</pre>
      </div>
    );
  }
}

export default Download;