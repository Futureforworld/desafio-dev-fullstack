import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Definir o tipo de dados que o backend retorna
interface Dados {
  nome: string;
  valor: number;
}

export default function Home() {
  // Estado para armazenar os dados do backend
  const [dados, setDados] = useState<Dados[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  // Efeito para buscar os dados do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/simular");

        // Verificar se a resposta do servidor foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na resposta do servidor: ${response.statusText}`);
        }

        // Tentar obter os dados como JSON
        const data = await response.json();

        // Verificar se os dados estão no formato esperado
        if (Array.isArray(data)) {
          const dadosValidos = data.every(
            (item) => typeof item.nome === "string" && typeof item.valor === "number"
          );
          if (dadosValidos) {
            setDados(data);
          } else {
            throw new Error("Dados no formato inválido.");
          }
        } else {
          throw new Error("Resposta do servidor não é um array.");
        }
      } catch (err) {
        // Garantir que a mensagem de erro seja uma string
        setErro(`Erro ao buscar dados do backend: ${(err as Error).message}`);
      }
    };

    fetchData();
  }, []); // O array vazio garante que a requisição aconteça apenas uma vez, ao carregar a página.

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Exibir os dados ou o erro, se houver */}
        {erro && <p>{erro}</p>}
        {dados.length > 0 ? (
          <ul>
            {dados.map((item, index) => (
              <li key={index}>
                {item.nome}: {item.valor}
              </li>
            ))}
          </ul>
        ) : (
          <p>Carregando dados...</p>
        )}

        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
