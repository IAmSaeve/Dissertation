import React from "react";
import { DownloadContext } from "../Contexts/DownloadContext";
import Spinner from "./Spinner";
class Download extends React.Component {
  static contextType = DownloadContext;
  render() {
    const { load, SpinnerActive } = this.context;
    return (
      <div className="download">
        <Spinner SpinnerActive={SpinnerActive} />
        <button onClick={(e) => load(this.props.match.params.id, e)}>Download<span>&#10132;</span></button>
      </div>
    );
  }
}

export default Download;