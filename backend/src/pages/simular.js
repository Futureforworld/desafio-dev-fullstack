"use client"; // Adiciona essa linha no início do arquivo

import React, { useEffect, useState } from "react";

const Simular = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/simular")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do backend");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Erro ao buscar dados: {error}</div>;
  }

  return (
    <div>
      <h1>Dados Simulados</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.nome}: {item.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Simular;

