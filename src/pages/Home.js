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
      <h2>Home Page</h2>
    </> 
    );
  }
}
 
export default Home;