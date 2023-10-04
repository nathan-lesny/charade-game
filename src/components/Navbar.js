import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return ( 
      <div className="navBody">
        <div id="intro">
          <a className="headLinks" href="home">
            <h1 id="name">Nathan Lesny</h1>
            <h2 id="dev">Developer</h2>
          </a>
        </div>
        <div id="links">
          <a className="navLinks" href="projects">Projects</a>
          <a className="navLinks" href="info">Info</a>
          <a className="navLinks" href="contact">Contact</a>
        </div>
      </div>
     );
  }
}
 
export default Navbar;