import Navbar from "../components/Navbar";
import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect} from 'react';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

function ViewGame() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [image, setImage] = useState("");
  const [gameid, setID] = useState(id);
  const [entries, setEntries] = useState([]);
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState();
  const [exists, setExists] = useState(false);
  const [sessionId, setSessionId] = useState();

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

  const addEntries = async id => {
    const data = await fetch(API_BASE + "/game/element/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        entries: newItem
      })
    }).then(res => res.json())
    .catch(err => console.error("Error: ", err))

    setItems("")
    setNewItem("")
  }

  const createSession = async() => {
    const data = await fetch(API_BASE + "/session/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionName: name,
        entries: entries
      })
    }).then(res => {
      setSessionId(res.id)
      res.json()
    })
  }

  return ( 
  <>
    <Navbar />
    <div style={{"margin": "75px"}} className="gameviewmain"></div>
    {exists ? (
      <div>
        <div className="view-game-container">
          <div>
            <img className="image-game-left" src={image} alt="Game image..." />
            <h1>{ name }</h1>
          </div>
          <div className="view-game-right">
            <ul>
              { entries.map((entry, a) => (
              <div key={a}>
                <hr></hr>
                <li>{entry}</li>
              </div>
              )) }
            </ul>
          </div>
        </div>
      <a className="btn btn-success" onClick={createSession} href={CLIENT_BASE + "/play/" + sessionId}>Start Game</a>
      <h2>Add Entries</h2>
      <input type="text"
            onChange={e => setNewItem(e.target.value)}
            value={newItem}/>
            <button className="btn btn-success" onClick={() => addEntries(id)}>Add Items</button>
      </div>): (
      <h1>This page does not Exist</h1>
    ) }
  </> 
  );
}
 
export default ViewGame;