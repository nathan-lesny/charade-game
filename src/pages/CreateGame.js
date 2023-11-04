import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

function CreateGame() {
  const [games, setGames] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newGame, setNewGame] = useState();
  const [image, setImage] = useState();
  const [entries, setEntries] = useState("")
  const [items, setItems] = useState()
  const [newItem, setNewItem] = useState();

  const addGame = async () => {
    const data = await fetch(API_BASE + "/game/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameName: newGame,
        image: image,
        entries: []
      })
    }).then(res => res.json())
    .then(res => addEntries(res.id)) //check this.....

    setGames([...games, data])
    setEntries()
    setImage()
    setPopupActive(false)
    setNewGame()
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

  return(
    <>
      <Navbar />
      <div style={{"margin": "85px"}} className="gameviewmain" />
        <div className="create-game-style" >
          <h1 className="center-elem pt-3">Create Game</h1>
          <div className="create-survey-wrapper">
            <div className="pair-css">
              <label className="task-item-label" >Name: </label>
              <input className="task-item-input" type="text"></input>
            </div>
            <div className="pair-css">
            <label className="task-item-label">Image: </label>
            <input className="task-item-input" type="text"></input>
            </div>
            <div className="pair-css">
              <label className="task-item-label">Entries: </label>
              <div className="task-item-input div-input">
                <textarea className="task-item" type="text" />
                <label className="task-item text-small description-css ">
                  (enter elements spaced with commas) 
                </label>
              </div>
            </div>
            <div className="pair-css">
              <label className="task-item-label">Public </label>
              <input className="task-item-button" onChange={e => setEntries(e.target.value)} type="checkbox" />
            </div>
          </div>
        </div>
    </>
  )
}

export default CreateGame