import { useState } from 'react';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes/simulacoes`) // Usa a variável de ambiente
      .then(response => response.json())
      .then(data => {
        setData(data); // Armazena os dados recebidos no estado
      })
      .catch(err => {
        setError('Erro ao buscar dados'); // Exibe mensagem de erro, se houver
      });
  };

  return (
    <div>
      <h1>Interaja para buscar dados do Backend</h1>
      <button onClick={fetchData}>Buscar Dados</button>
      {error && <div>{error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Home;


