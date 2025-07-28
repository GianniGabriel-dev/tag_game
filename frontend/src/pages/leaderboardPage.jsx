import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function LeaderboardPage() {
  const {selectedGame} = useParams();
  console.log(selectedGame)
  const [fetchedLeaderboard, setFetchedLeaderboard]= useState({})
  const [fetchedGames, setfetchedGames]= useState({})

  //se obtiene la leaderboard de un juego especifico y todos los juegos para mostar el nombre en la leaderboard
  useEffect(()=>{
    const fetchLeaderboard = async () => {
      try {
        const scores = await fetch(`http://localhost:3000/${selectedGame}/leaderboard`);
        const games = await fetch(`http://localhost:3000/games`);
        if (!scores.ok || !games.ok) {
          throw new Error("Network response was not ok");
        }
        const leaderboard = await scores.json();
        setFetchedLeaderboard(leaderboard); 
        const gamesData = await games.json()
        setfetchedGames(gamesData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLeaderboard()
  },[selectedGame])
  console.log(fetchedLeaderboard)
  console.log(fetchedGames)

  const gameName = fetchedGames?.allGames?.find(game => game.gameId ===parseInt(selectedGame, 10))?.gameName || ""
  console.log(gameName)

  return (
    <>
        {/*Como se hace una peticion al backend se usan interrogaciones en los datos a mostar en la pagina para hacerlos opcionales y que no pete ya que no existen*/}
        {fetchedLeaderboard?.leaderboard?.length === 0 ?(
          <h2>There are no scores yet</h2>
        ):(
          <section className="leaderboardContianer">
            <h2>Leaderboard of {gameName} </h2>
          </section>
        )}
    </>
  )
}
