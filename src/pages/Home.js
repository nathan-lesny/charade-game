import Navbar from "../components/Navbar";
import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {  }
  render() { 
    return ( 
    <>
      <Navbar />
      <div className="d-flex justify-content-center" style={{"font-weight": "regular", "margin-top": "25px"}}>
        <h2>Welcome to charad.it!</h2>
      </div>
    </> 
    );
  }
}
 
export default Home;