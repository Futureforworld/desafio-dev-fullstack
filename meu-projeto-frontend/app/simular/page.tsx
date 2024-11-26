// page.tsx
'use client';

import { useEffect, useState } from 'react';

type DataType = {
  id: number;
  name: string;
};

const SimularPage = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Variável de ambiente
        const response = await fetch(`${backendUrl}/api/endpoint`); // Substitua /api/endpoint pelo endpoint do backend
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do backend');
        }
        const result: DataType[] = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Simular</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimularPage;


