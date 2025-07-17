import { useNavigate } from "react-router-dom";
import { smallImages } from "../../utils/ArrayImages.js";
import "/styles/homePage.css"

export function HomePage() {
    const navigate = useNavigate();

  return (
    <>
        <p>Homepaga</p>
        <section className="imagesContainer">
            {smallImages.map((image)=>(
                <article onClick={() => navigate(`/${image.linkName}`)} className="imageContainer" key={image.name}>
                    <img src={image.img} alt={`Image of ${image.name}`}/>
                    <p>{image.name}</p>
                </article>
            ))}
        </section>

    </>
  )
}