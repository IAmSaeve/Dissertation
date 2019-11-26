/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Head extends Component {
  render() {
    return (
      <header>
        <nav>
          {/* TODO: This should be a h1 with h3 styling */}
          <h3>FileCompanion</h3>
          <ul>
            <li>
              <Link to='/Upload'>Upload</Link>
            </li>
            <li>
              <Link to='/Download' >Download</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Head;