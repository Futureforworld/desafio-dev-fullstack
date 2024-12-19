import { Router } from "express";
import { Client } from "pg";

const router = Router();

// Configuração do cliente PostgreSQL
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "app_db",
  password: "Rock@2025",
  port: 5432,
});

// Registrar nova simulação
router.post("/", async (req, res) => {
  const { nome, email, telefone, unidades } = req.body;

  if (!nome || !email || !telefone || !unidades || unidades.length < 1) {
    return res.status(400).json({ error: "Dados inválidos. Verifique os campos obrigatórios." });
  }

  try {
    // Inserir lead
    const insertLeadQuery = `
      INSERT INTO leads (nome, email, telefone)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const leadResult = await client.query(insertLeadQuery, [nome, email, telefone]);
    const leadId = leadResult.rows[0].id;

    for (const unidade of unidades) {
      const { codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH } = unidade;

      if (historicoDeConsumoEmKWH.length !== 12) {
        return res.status(400).json({ error: "O histórico de consumo deve conter 12 meses." });
      }

      // Inserir unidade
      const insertUnitQuery = `
        INSERT INTO unidades (lead_id, codigo_da_unidade_consumidora, modelo_fasico, enquadramento)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const unitResult = await client.query(insertUnitQuery, [leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento]);
      const unitId = unitResult.rows[0].id;

      for (const consumo of historicoDeConsumoEmKWH) {
        const { consumoForaPontaEmKWH, mesDoConsumo } = consumo;

        // Inserir consumo
        const insertConsumptionQuery = `
          INSERT INTO consumos (unidade_id, consumo_fora_ponta_em_kwh, mes_do_consumo)
          VALUES ($1, $2, $3)
        `;
        await client.query(insertConsumptionQuery, [unitId, consumoForaPontaEmKWH, mesDoConsumo]);
      }
    }

    res.status(201).json({ message: "Simulação registrada com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar simulação:", error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Listar todas as simulações
router.get("/", async (req, res) => {
  try {
    const simulacoesQuery = `
      SELECT * FROM leads
      INNER JOIN unidades ON leads.id = unidades.lead_id
    `;
    const result = await client.query(simulacoesQuery);
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar simulações:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar simulações." });
  }
});

// Buscar simulação por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const simulacaoQuery = `
      SELECT * FROM leads
      INNER JOIN unidades ON leads.id = unidades.lead_id
      WHERE leads.id = $1
    `;
    const result = await client.query(simulacaoQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Simulação não encontrada." });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar simulação por ID:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar simulação." });
  }
});

export default router;







