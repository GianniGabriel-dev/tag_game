import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "/styles/leaderboard.css"

export function LeaderboardPage() {
  const {selectedGame} = useParams();
  console.log(selectedGame)
  const [fetchedLeaderboard, setFetchedLeaderboard]= useState({})
  const [fetchedGames, setfetchedGames]= useState({})
  const [loading, setLoading] = useState(true)

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
      } finally{
        setLoading(false)
      }
    };
    fetchLeaderboard()
  },[])
  console.log(fetchedLeaderboard)
  console.log(fetchedGames)

  const gameName = fetchedGames?.allGames?.find(game => game.gameId ===parseInt(selectedGame, 10))?.gameName || ""
  console.log(gameName)

  return (
    <>
        {/*Como se hace una peticion al backend se usan interrogaciones en los datos a mostar en la pagina para hacerlos opcionales y que no pete ya que no existen*/}
      <section className="leaderboardContainer">
        {loading ? (
          <div className="loader-wrapper">
            <div className="spinner"></div>
          </div>
        ) : fetchedLeaderboard?.leaderboard?.length === 0 ? (
          <div className="noScores">
            <h3>{gameName}</h3>
            <p>There are no scores yet</p>
          </div>

        ) : (
          <>
            <h3>{gameName}</h3>
            <article className="leaderboardTable">
              <div className="tableFieldsNames">
                <p>Player names</p>
                <p>Time</p>
              </div>
              <article className="tableFieldsContainer">
                {fetchedLeaderboard.leaderboard.map((player, index) => (
                  <div className="tableFields" key={index}>
                    <p>{player.playerName}</p>
                    <p>{player.timeScore}</p>
                  </div>
                ))}
              </article>
            </article>
          </>
        )}
      </section>
    </>
  )
}
