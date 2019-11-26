/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Navi from "./Router/Header";
import RouterOutput from "./Router/RouterOutput";
import './Styles/App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navi></Navi>
        <RouterOutput></RouterOutput>
      </div>
    );
  }
}

export default App;
