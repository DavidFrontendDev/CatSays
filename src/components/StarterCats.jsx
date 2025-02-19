import React, { useEffect, useState } from "react";

function StarterCats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCats() {
      try {
        const requests = Array.from({ length: 10 }, async () => {
          const response = await fetch("https://cataas.com/cat/gif");
          if (!response.ok) throw new Error("Error al obtener el GIF");
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const catGifs = await Promise.all(requests);
        setData(catGifs);
      } catch (error) {
        console.error("Error fetching cat GIFs:", error);
      }
    }

    fetchCats();
  }, []);

  return (
    <main className="container mt-5 bg-dark rounded shadow-xl py-3">
      <h3 className="text-center text-white">Some Random Cat Gifs:</h3>
      <article className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        {data.map((gifUrl, index) => (
          <img
            src={gifUrl}
            key={index}
            height={250}
            width={250}
            className="rounded-2 shadow-lg border border-black"
          />
        ))}
      </article>
    </main>
  );
}

export default StarterCats;
