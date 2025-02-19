import React, { useEffect, useState } from "react";

function StarterCats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchRandomCats() {
      try {
        const response = await fetch(
          `https://cataas.com/api/cats?limit=10&skip=${Math.floor(
            Math.random() * 100
          )}`
        );
        if (!response.ok) throw new Error("Error trying to get imgs");
        const cats = await response.json();
        const catImages = cats.map(
          (cat) => `https://cataas.com/cat/${cat.id}?random=${Math.random()}`
        );
        console.log(catImages);
        setData(catImages);
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    }

    fetchRandomCats();
  }, []);

  return (
    <main className="container mt-5 bg-dark rounded shadow-xl py-3">
      <h3 className="text-center text-white">Some Random Cat Images:</h3>
      <article className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        {data.length > 0 ? (
          data.map((imgUrl, index) => (
            <img
              src={imgUrl}
              key={index}
              height={250}
              width={250}
              className="rounded-2 shadow-lg border border-black"
              alt="Random Cat"
            />
          ))
        ) : (
          <p className="text-white text-center">Loading cat images...</p>
        )}
      </article>
    </main>
  );
}

export default StarterCats;
