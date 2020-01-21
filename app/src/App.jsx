import React, { Component } from "react";
import RouterOutput from "./Router/RouterOutput";
import "./Styles/bundle.scss";
import UploadContextProvider from "./Contexts/UploadContext";
import Header from "./Router/Header";

class App extends Component {
  render() {
    return (
      <>
        <UploadContextProvider>
          <Header className="header" />
          <RouterOutput className="body" />
        </UploadContextProvider>
      </>
    );
  }
}

export default App;
