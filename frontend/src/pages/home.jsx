import { useNavigate } from "react-router-dom";
import { smallImages } from "../../utils/ArrayImages.js";
import "/styles/homePage.css";

export function HomePage() {
  const navigate = useNavigate();

  //al hacer click en la imagen te lleva al juego correspondiente y se le pasa el id para usarlo luego en la comunicación con la API
  return (
    <>
      <section className="imagesContainer">
        {smallImages.map((image) => (
          <article
            onClick={() =>
              navigate(`/${image.linkName}`, {
                state: { game_id: image.game_id }, //se pasa el id
              })
            }
            className="imageContainer"
            key={image.name}
          >
            <img src={image.img} alt={`Image of ${image.name}`} />
            <p className="nameGame">{image.name}</p>
            <p className="playGame">PLAY</p>
          </article>
        ))}
      </section>
    </>
  );
}
