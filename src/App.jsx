import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import StarterCats from "./components/StarterCats";
import { useRef, useState } from "react";

function App() {
  const userText = useRef(null);
  const colorUser = useRef(null);
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);

  async function createGif(text, color) {
    try {
      const response = await fetch(
        `https://cataas.com/cat/gif/says/${text}?fontColor=${color}&fontSize=30`
      );

      if (!response.ok) {
        throw new Error("Error al obtener el GIF");
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGif(imageUrl);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCreateGif(event) {
    event.preventDefault();
    setLoading(true);
    setGif("");
    const text = userText.current.value;
    const color = colorUser.current.value;
    createGif(text, color);
  }

  return (
    <div className="min-vh-100 bg-secondary">
      <header className="container text-white bg-dark rounded shadow py-4">
        <nav className="d-flex align-items-center flex-column justify-content-center">
          <h1 className="text-light">🐈 Create your own CAT GIF</h1>
          <form className="d-flex gap-2">
            <input ref={userText} className="form-control" />
            <select className="form-select" ref={colorUser}>
              <option>White</option>
              <option>Black</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Yellow</option>
              <option>Green</option>
            </select>
            <button className="btn btn-warning" onClick={handleCreateGif}>
              Create
            </button>
          </form>
        </nav>
      </header>

      {(loading || gif) && (
        <div className="container container-sm rounded d-flex align-items-center justify-content-center bg-dark p-3 my-2 h-50 flex-column">
          <h3 className="text-white mx-1">Here is your personalized gif:</h3>
          {loading ? (
            <div class="spinner-border text-warning text-center" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <img src={gif} className="img-fluid" alt="Generated Cat GIF" />
              <a
                href={gif}
                download="cat-gif-personalized.gif"
                className="btn btn-warning mt-3"
              >
                <i className="bi bi-download"></i> Download GIF
              </a>
            </>
          )}
        </div>
      )}

      <StarterCats />
    </div>
  );
}

export default App;
