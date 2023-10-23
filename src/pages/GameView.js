import { useState, useEffect} from 'react';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

function GameView() {
  const [games, setGames] = useState([])
  const [items, setItems] = useState()
  const [popupActive, setPopupActive] = useState(false)
  const [newGame, setNewGame] = useState();
  const [newItem, setNewItem] = useState();

  useEffect(() => {
    GetGames();
    console.log(games)
  }, [])

  const GetGames = () => {
    fetch(API_BASE + "/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Error: ", err))
  }


  const addGame = async () => {
    const data = await fetch(API_BASE + "/game/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameName: newGame,
        entries: newItem
      })
    }).then(res => res.json())

    setGames([...games, data])
    setPopupActive(false)
    setNewGame("")
    setItems("")
    setNewItem("")
  }

  const deleteGame = async id => {
		const data = await fetch(API_BASE + "/game/delete/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(setGames(games => games.filter(game => game._id !== id)));
	}

  return ( 
  <div className="container">
    <h1>Published Games:</h1>
    {/* Implementation of mapping for games */}
    <div className="games row row-cols-auto">
      {games.map((game) => (
        <div className="card col m-2" style={{"width": "250px", "height": "250px"}} key={game._id}>
          <a className="h-100" style={{"text-decoration": "none", "color": "black"}} href={CLIENT_BASE + "/game-view/" + game._id}>
          <h4 className="gameName card-title">{game.gameName}</h4>
          <div className="card-body">
            {game.entries.map((entry, i) => (
              <div key={i}>
                {i < 5 ? (<div className="game-entry">{entry}</div>): ""}
              </div>
            ))}
          </div>
          </a>
          <button className="delete-game btn btn-close position-absolute top-0 end-0 m-1" onClick={() => deleteGame(game._id)} />
        </div>
      ))}
    </div>
    {!popupActive ? (<div className="addPopup btn btn-outline-success" onClick={() => setPopupActive(true)}> + </div>): ''}
    {popupActive ? (
        <div className="popup">
          <button className='closePopup btn btn-close' onClick={() => setPopupActive
          (false)}></button>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" 
            className='add-game-input' 
            onChange={e => setNewGame(e.target.value)}
            value={newGame} />
            <input type="text"
            className="add-game-input"
            onChange={e => setNewItem(e.target.value)}
            value={newItem} />
            <div className="btn btn-submit" type="submit" onClick={addGame}>Create game</div>
          </div>
        </div>
      ) : '' }
  </div> 
  );
}
 
export default GameView;