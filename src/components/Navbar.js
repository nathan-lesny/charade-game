import React, { Component } from 'react';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return ( 
        <nav className="cssNav">
          <a className="nav-item-css" href={CLIENT_BASE}>
            <img style={{"width": "30px"}} src="https://www.shareicon.net/data/512x512/2016/03/24/738615_people_512x512.png"></img>
            Charad.it
          </a>
          <a className="nav-item-css" href={CLIENT_BASE + "/game-view"}>View Games</a>
          <a className="nav-item-css" href={CLIENT_BASE + "/how-to-play"}>How To Play</a>
          <a className="nav-item-css" href={CLIENT_BASE + "/create-game"}>Create Game</a>
        </nav>
     );
  }
}
 
export default Navbar;