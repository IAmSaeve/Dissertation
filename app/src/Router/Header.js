/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Head extends Component {
  render() {
    return (
      <nav>
        <div>
          <ul >
            <li><h3 >FileCompanion </h3></li>
            <li>
              <Link to='/Upload'>Upload</Link>
            </li>
            <li>
              <Link to='/Download' >Download</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Head;