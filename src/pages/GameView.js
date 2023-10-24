import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';

const API_BASE = "http://localhost:3001"
const CLIENT_BASE = "http://localhost:3000"

function GameView() {
  const [games, setGames] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newGame, setNewGame] = useState();
  const [image, setImage] = useState();

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
        image: image
      })
    }).then(res => res.json())

    setGames([...games, data])
    setPopupActive(false)
    setNewGame("")
    setImage("")
  }

  const deleteGame = async id => {
		const data = await fetch(API_BASE + "/game/delete/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(setGames(games => games.filter(game => game._id !== id)));
	}

  return ( 
  <>
  <Navbar />
    <div style={{"margin": "100px"}} className="gameviewmain">
    <div className="games row row-cols-auto">
      {games.map((game) => (
        <div className="card col m-2 css-card" key={game._id}>
          <img className="card-img-top" style={{"padding": "0px", "border-radius": "10px", "min-height": "250px"}} src={game.image} alt="Game image..." />
          <div className="card-body" style={{"margin-top": "-65px", "background-color": "white", "border-radius": "0 0 10px 10px"}}>
            <h5 className="card-title" style={{"font-size": "1.4em"}}>{game.gameName}</h5>
            <a href={CLIENT_BASE + "/game-view/" + game._id}>Play Game</a>
          </div>
          <button className="delete-game btn btn-close position-absolute top-0 end-0 m-1" style={{"padding": "14px"}} onClick={() => deleteGame(game._id)} />
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
            <div id="task-holder">
              <div className="inner-task">
                <label style={{"margin-right": "5px"}}>Name:</label>
                <input placeholder="Set name" type="text" 
                className='add-game-input' 
                onChange={e => setNewGame(e.target.value)}
                value={newGame} />
              </div>
              <div className="inner-task">
                <label style={{"margin-right": "5px"}}>Image Address:</label>
                <input placeholder="https://image.com" type="text" 
                className='add-game-input' 
                onChange={e => setImage(e.target.value)}
                value={image} />
              </div>
            </div>
            <div className="btn btn-submit" type="submit" onClick={addGame}>Create game</div>
          </div>
        </div>
      ) : '' }
      </div>
  </>
  );
  
}
 
export default GameView;