import React, { Component } from "react";
import RouterOutput from "./Router/RouterOutput";
import "./Styles/bundle.scss";
import UploadContextProvider from "./Contexts/UploadContext";
import DownloadContextProvider from "./Contexts/DownloadContext";
import Header from "./Router/Header";

class App extends Component {
  render() {
    return (
      <>
        <DownloadContextProvider>
          <UploadContextProvider>
            <Header className="header" />
            <RouterOutput className="body" />
          </UploadContextProvider>
        </DownloadContextProvider>
      </>
    );
  }
}

export default App;
