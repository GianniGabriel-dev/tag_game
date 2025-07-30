import { useNavigate } from "react-router-dom";
import "/styles/header.css";
import trophy from "../assets/trophy.svg";
export function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigate("/")}>
        Sp
        <span>
          <img
            src="../assets/crosshair.png"
            alt="image of a corsshair simuling an O"
          />
        </span>
        t <span className="itText">IT</span>
      </h1>
      <span
        className="trophy-wrapper"
        onClick={() => navigate("/1/leaderboard")}
      >
        <img className="trophy" src={trophy} alt="Image of a trophy" />
      </span>
    </header>
  );
}
