import React, { Component } from "react";
import RouterOutput from "./Router/RouterOutput";
import "./Styles/base.scss";
import UploadContextProvider from "./Contexts/UploadContext";
import Header from "./Router/Header";

class App extends Component {
  render() {
    return (
      <div className="mainGrid">
        <UploadContextProvider>
          <Header className="header" />
          <RouterOutput className="body" />
        </UploadContextProvider>
      </div>
    );
  }
}

export default App;
