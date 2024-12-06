import express from "express";
import simulacoesRoutes from "./routes/simulacoes";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg"; 
import "reflect-metadata";
const { Client } = pkg;

const app = express();
const port = 4000; // Porta do backend

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(simulacoesRoutes);

// Conexão com o banco de dados
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "app_db",
  password: "Rock@2025",
  port: 5432,
});

client.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => {
    console.error("Erro ao conectar com o banco de dados:", err);
    process.exit(1);
  });

// Endpoints

// Registrar nova simulação
app.post("/simulacao", async (req, res) => {
  const { nome, email, telefone, unidades } = req.body;

  if (!nome || !email || !telefone || !unidades || unidades.length < 1) {
    return res.status(400).json({ error: "Dados inválidos. Verifique os campos." });
  }

  try {
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

      const insertUnitQuery = `
        INSERT INTO unidades (lead_id, codigo_da_unidade_consumidora, modelo_fasico, enquadramento)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const unitResult = await client.query(insertUnitQuery, [leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento]);
      const unitId = unitResult.rows[0].id;

      for (const consumo of historicoDeConsumoEmKWH) {
        const { consumoForaPontaEmKWH, mesDoConsumo } = consumo;

        const insertConsumptionQuery = `
          INSERT INTO consumos (unidade_id, consumo_fora_ponta_em_kwh, mes_do_consumo)
          VALUES ($1, $2, $3)
        `;
        await client.query(insertConsumptionQuery, [unitId, consumoForaPontaEmKWH, mesDoConsumo]);
      }
    }

    res.status(201).json({ message: "Simulação registrada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Listar todas as simulações
app.get("/simulacoes", async (req, res) => {
  try {
    const simulacoesQuery = `
      SELECT * FROM leads
      INNER JOIN unidades ON leads.id = unidades.lead_id
    `;
    const result = await client.query(simulacoesQuery);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar simulações." });
  }
});

// Buscar simulação por ID
app.get("/simulacao/:id", async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar simulação." });
  }
});

// Iniciar o servidor
app.listen(4000, () => {
  console.log("Servidor backend rodando em http://localhost:4000");
});


