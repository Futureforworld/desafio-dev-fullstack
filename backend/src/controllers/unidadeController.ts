import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Certifique-se de que o prismaClient está configurado corretamente

class UnidadeController {
  // Criar uma nova unidade associada a um lead
  async createUnidade(req: Request, res: Response) {
    try {
      const { leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH } = req.body;

      // Verificar se o lead existe
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });
      if (!lead) {
        return res.status(404).json({ error: 'Lead não encontrado' });
      }

      // Validar se o histórico de consumo contém exatamente 12 meses
      if (historicoDeConsumoEmKWH.length !== 12) {
        return res.status(400).json({ error: 'O histórico de consumo deve conter exatamente 12 meses' });
      }

      // Criar a unidade
      const unidade = await prisma.unidade.create({
        data: {
          leadId,
          codigoDaUnidadeConsumidora,
          modeloFasico,
          enquadramento,
          historicoDeConsumoEmKWH: {
            createMany: {
              data: historicoDeConsumoEmKWH,
            },
          },
        },
      });

      return res.status(201).json(unidade);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar unidade' });
    }
  }

  // Listar unidades (opcionalmente por filtros)
  async listUnidades(req: Request, res: Response) {
    try {
      const { leadId, codigoDaUnidadeConsumidora } = req.query;

      // Construir filtros dinamicamente
      const where: any = {};
      if (leadId) where.leadId = String(leadId);
      if (codigoDaUnidadeConsumidora) where.codigoDaUnidadeConsumidora = String(codigoDaUnidadeConsumidora);

      const unidades = await prisma.unidade.findMany({
        where,
        include: {
          historicoDeConsumoEmKWH: true,
        },
      });

      return res.status(200).json(unidades);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar unidades' });
    }
  }

  // Buscar uma unidade específica pelo ID
  async getUnidadeById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const unidade = await prisma.unidade.findUnique({
        where: { id },
        include: {
          historicoDeConsumoEmKWH: true,
        },
      });

      if (!unidade) {
        return res.status(404).json({ error: 'Unidade não encontrada' });
      }

      return res.status(200).json(unidade);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar unidade' });
    }
  }
}

export default new UnidadeController();
