import { useParams } from "react-router-dom"
import "/styles/playPage.css"
import { useState } from "react";
import { imagesToFind } from "../../utils/ArrayImages.js";

export function PlayPage() {
  const {selectedGame} = useParams();
  console.log(selectedGame)
  const formatedSelectedGame = selectedGame.replace(/-/g, " ");
  const gameData = imagesToFind.find(game=> game.id === selectedGame)  

  console.log(gameData)
  console.log(gameData.characters[0].img)
  const [message, setMessage]= useState("")

  if(!gameData) return <p>we can't find that game</p>

  return (
    <>
        <section className="gameMenu">
            <h2>{formatedSelectedGame}🎮</h2>
            <article className="charactersContainer">
              <ul>
                <li><p>{gameData.characters[0].name }</p><img src={`characters/${gameData.characters[0].img}`}/></li>
                <li><p>{gameData.characters[1].name }</p><img src={`characters/${gameData.characters[1].img}`}/></li>
                <li><p>{gameData.characters[2].name }</p><img src={`characters/${gameData.characters[2].img}`}/></li>
              </ul>
              <p className="message">{message}</p>
            </article>
            <img src={`/${selectedGame}.png`} alt={`Big image of a ${selectedGame}`} />
        </section>
        
    </>
  )
}