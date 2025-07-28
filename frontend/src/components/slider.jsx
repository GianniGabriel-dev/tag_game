import { useNavigate, useParams } from "react-router-dom";
import "/styles/slider.css";
export function Slider({ gameName, fetchedGames }) {
    const { selectedGame } = useParams()
    const navigate = useNavigate()

  const totalGames = fetchedGames?.allGames?.length || 0;
  const currentIndex = parseInt(selectedGame, 10); 


  const goLeft = () => {
    const previousGame = currentIndex - 1;
     //mientras el indice sea mayor a 0 se le restara un indice y redigirigira al juego de la izq
    if (previousGame > 0) {
      navigate(`/${previousGame}/leaderboard`);
    } else {
      // si estás en el primero, redirige al último
      navigate(`/${totalGames}/leaderboard`);
    }
  };

  const goRight = () => {
    const nextGame = currentIndex + 1;
    //mientras el indice sea menor o igual al total de juegos que existan redirige al siguente juego sumando 1 al indice
    if (nextGame <= totalGames) {
      navigate(`/${nextGame}/leaderboard`);
    } else {
      // si estás en el ultimo, redirige al primero
      navigate(`/1/leaderboard`);
    }
  };
  return (
    <div className="leaderboardSlider">
      <div onClick={goLeft} className="sliderArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3>{gameName}</h3>
      <div onClick={goRight} className="sliderArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
