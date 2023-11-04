import Navbar from "../components/Navbar";
import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect} from 'react';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

function PlayInterface() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [image, setImage] = useState("");
  const [gameid, setID] = useState(id);
  const [entries, setEntries] = useState([]);
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState();
  const [exists, setExists] = useState(false);

  useEffect(() => {
    setUpGame();
  })
  
  const setUpGame = () => {
    fetch(API_BASE + "/game-by-id/" + id)
    .then(res => res.json())
    .then(data => {
      setImage(data.image)
      setName(data.gameName)
      setEntries(data.entries)
      setExists(true)
    })
    .catch(err => console.error("Error: ", err))
  }

  return(
    <>
      <Navbar />
      <div style={{"margin": "100px"}} className="gameviewmain"></div>
    </>
  )
}

export default PlayInterface;