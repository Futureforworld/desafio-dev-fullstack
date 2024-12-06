import { Router } from 'express';
import db from './db'; // Certifique-se de que a conexão está correta

const router = Router();

router.get("/simulacoes", async (req, res) => {
  try {
    const simulacoes = await db.query("SELECT * FROM simulacoes");
    res.json(simulacoes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar simulações." });
  }
});

router.get("/simulacao", (req, res) => {
  res.status(200).json({ message: "Rota simulacao funcionando!" });
});

export default router;







