import React from "react";

class Download extends React.Component {
  render() {
    return (
      <div>
        <pre>{this.props.match.params.id}</pre>
      </div>
    );
  }
}

export default Download;