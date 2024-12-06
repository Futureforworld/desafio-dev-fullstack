import { useEffect, useState } from "react";
import axios from "axios";

const Listagem = () => {
  const [simulacoes, setSimulacoes] = useState([]);

  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/simulacoes");
        setSimulacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar simulações:", error);
      }
    };
    fetchSimulacoes();
  }, []);

  return (
    <div>
      <h1>Simulações Registradas</h1>
      {simulacoes.length === 0 ? (
        <p>Nenhuma simulação encontrada.</p>
      ) : (
        <ul>
          {simulacoes.map((simulacao) => (
            <li key={simulacao.id}>
              <p>Nome: {simulacao.nomeCompleto}</p>
              <p>Email: {simulacao.email}</p>
              <p>Telefone: {simulacao.telefone}</p>
              {/* Adicione outros campos conforme necessário */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listagem;
