import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function StarterCats() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function principalData() {
      const data = await fetch("https://cataas.com/cat/gif?json=true");
      const dataJson = await data.json();
      setData((prev) => [...prev, dataJson]);
    }
    for (let i = 0; i < 10; i++) {
      principalData();
    }
  }, []);
  return (
    <main className="container mt-5 bg-dark rounded shadow-xl py-3  ">
      <h3 className="text-center text-white">Some Random Cat Gifs:</h3>
      <article className="d-flex align-items-center justify-content-center flex-wrap gap-1 ">
        {data.map((item, index) => (
          <img
            src={item.url}
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
