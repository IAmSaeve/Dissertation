/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import RouterOutput from "./Router/RouterOutput";
import './Styles/base.scss';
import UploadContextProvider from './Contexts/UploadContext';

class App extends Component {
  render() {
    return (
      <div>
      <UploadContextProvider>
        <RouterOutput></RouterOutput>
        </UploadContextProvider>
      </div>
    );
  }
}

export default App;
