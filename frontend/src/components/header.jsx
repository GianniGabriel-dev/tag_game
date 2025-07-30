import { useNavigate } from "react-router-dom";
import "/styles/header.css";
export function Header() {
  const navigate = useNavigate()

 
  return (
    <header>
      <h1 onClick={()=> navigate("/")}>
        Sp
        <span>
          <img
            src="../assets/crosshair.png"
            alt="image of a corsshair simuling an O"
          />
        </span>
        t <span className="itText">IT</span>
      </h1>
    </header>
  );
}
