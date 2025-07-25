import { useLocation, useParams } from "react-router-dom"
import "/styles/playPage.css"
import { useState } from "react";
import { imagesToFind } from "../../utils/ArrayImages.js";
import { Timer } from "../components/timer.jsx";
import { useEffect } from "react";
import { checkIfCharacterFound, endGame, getTotalTime, startGame } from "../../utils/gameLogic.js";
import { Dialog } from "../components/dialog.jsx";


export function PlayPage() {
  const {selectedGame} = useParams();
  //use location accede la  infomacion que manda la pagian home al hacer click en una iamgen
  const location = useLocation();
  const gameId = location.state?.game_id;
 //logica para guardar el tiempo de inicio y fin del juego de manera segura haciendo peticiones al backend
  const [startedAt, setStartedAt]=useState("")
  const [endedAt, setEndedAt]=useState("")

async function handleStartGame() {
  const data = await startGame(gameId);
  setStartedAt(data.startedAt)
}

  
  async function handleEndGame() {
  const data = await endGame(gameId);
  setEndedAt(data.endedAt)
  console.log(endedAt)
}

 
  const gameData = imagesToFind.find(game=> game.id === selectedGame)  

  console.log(gameData)
  const [message, setMessage]= useState("")
  const [fetchedData, setFetchedData]= useState({})
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(()=>{
    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${gameId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFetchedData(data); 
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
    handleStartGame()
  },[gameId])
  console.log(fetchedData)
  console.log(startedAt)

  useEffect(()=>{
    const finalizeGame = async () => {
      if (foundCharacters.length === 3) {
        await handleEndGame(gameId);

        setDialogOpen(true);
      }
    };

    finalizeGame();
  },[foundCharacters.length, gameId])

 const handleImageClick = (event) => {
    const img = event.target;
    
    const rect = img.getBoundingClientRect(); // obtine el tamaño y la posicion de la imagen dependiendo del tamaño de la pantalla

    //se calcula las coordenadas del click en la imagen
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    //se pasa las coordenads a porcentajes para hacer que los ckicks sean responsivos a cualquier tamaño de pantalla
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const formattedX = percentX.toFixed(2);
    const formattedY = percentY.toFixed(2);

    //se llama a la funcion que comprueba si el click esta cerca de alguna coordenada de un personaje, en caso de que si se añade a foundCharacters, la tolerancia es
    //el margen de error que se le da al click
    checkIfCharacterFound(formattedX, formattedY, fetchedData, foundCharacters, setFoundCharacters, setMessage, 1)
    console.log(foundCharacters.length)
  };

  if(!gameData) return <p>we can't find that game</p>

  return (
    <> 
        {dialogOpen && (
          <Dialog 
          isOpen={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
          gameId = {gameId}
          totalTime={getTotalTime(startedAt, endedAt)}
          />
        )}
        <section className="gameMenu">
            <h2>{gameData.name}🎮</h2>
            <section className="stickyMenus">
              <article className="charactersContainer">
                <ul>
                  <li><p>{gameData.characters[0].name }</p><img src={`characters/${gameData.characters[0].img}`}/></li>
                  <li><p>{gameData.characters[1].name }</p><img src={`characters/${gameData.characters[1].img}`}/></li>
                  <li><p>{gameData.characters[2].name }</p><img src={`characters/${gameData.characters[2].img}`}/></li>
                </ul>
                <p className="message">{message}</p>
              </article>
              <Timer dialogOpen={dialogOpen}/>
            </section>

            <img onClick={handleImageClick} src={`/${selectedGame}.png`} alt={`Big image of a ${selectedGame}`} />
        </section>
        
    </>
  )
}