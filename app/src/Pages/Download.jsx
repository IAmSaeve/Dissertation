import React from "react";
import { DownloadContext } from "../Contexts/DownloadContext";
class Download extends React.Component {
  static contextType = DownloadContext;
  render() {
    const { load } = this.context;
    return (
      <div className="download">
        <button onClick={(e) => load(this.props.match.params.id, e)}>Download<span>&#10132;</span></button>
      </div>
    );
  }
}

export default Download;