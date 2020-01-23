import React, { Component } from "react";
import { Link } from "react-router-dom";

class Head extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="logo">
            <h4>FileCompanion</h4>
          </div>
          <ul className="nav-links medium-up">
            <li>
              <Link to="/Upload">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Project">Project</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Head;