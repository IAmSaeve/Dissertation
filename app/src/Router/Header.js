import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Head extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="logo">
            <h4>FileCompanion</h4>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/projekt">Project</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Head;