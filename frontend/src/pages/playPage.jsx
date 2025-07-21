import { useLocation, useParams } from "react-router-dom"
import "/styles/playPage.css"
import { useState } from "react";
import { imagesToFind } from "../../utils/ArrayImages.js";
import { Timer } from "../components/timer.jsx";
import { useEffect } from "react";


export function PlayPage() {
  const {selectedGame} = useParams();
  //use location accede la  infomacion que manda la pagian home al hacer click en una iamgen
  const location = useLocation();
  const gameId = location.state?.game_id;

  console.log(selectedGame)
  const formatedSelectedGame = selectedGame.replace(/-/g, " ");
  const gameData = imagesToFind.find(game=> game.id === selectedGame)  

  console.log(gameData)
  console.log(gameData.characters[0].img)
  const [message, setMessage]= useState("")
  const [fetchedData, setFetchedData]= useState(null)

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
  },[gameId])
  console.log(fetchedData)

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

    setMessage(`Has hecho clic en: ${formattedX}% X, ${formattedY}% Y`);
  };

  if(!gameData) return <p>we can't find that game</p>

  return (
    <>
        <section className="gameMenu">
            <h2>{formatedSelectedGame}🎮</h2>
            <section className="stickyMenus">
              <article className="charactersContainer">
                <ul>
                  <li><p>{gameData.characters[0].name }</p><img src={`characters/${gameData.characters[0].img}`}/></li>
                  <li><p>{gameData.characters[1].name }</p><img src={`characters/${gameData.characters[1].img}`}/></li>
                  <li><p>{gameData.characters[2].name }</p><img src={`characters/${gameData.characters[2].img}`}/></li>
                </ul>
                <p className="message">{message}</p>
              </article>
              <Timer/>
            </section>

            <img onClick={handleImageClick} src={`/${selectedGame}.png`} alt={`Big image of a ${selectedGame}`} />
        </section>
        
    </>
  )
}