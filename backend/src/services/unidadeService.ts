import prisma from '../prismaClient';
import { Unidade } from '@prisma/client';

class UnidadeService {
  // Criar uma nova unidade
  async createUnidade(data: {
    leadId: string;
    codigoDaUnidadeConsumidora: string;
    modeloFasico: string;
    enquadramento: string;
    historicoDeConsumoEmKWH: {
      consumoForaPontaEmKWH: number;
      mesDoConsumo: Date;
    }[];
  }): Promise<Unidade> {
    const { leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH } = data;

    // Verificar se o lead existe
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });
    if (!lead) {
      throw new Error('Lead não encontrado');
    }

    // Validar se o histórico de consumo tem exatamente 12 meses
    if (historicoDeConsumoEmKWH.length !== 12) {
      throw new Error('O histórico de consumo deve conter exatamente 12 meses');
    }

    // Criar a unidade
    return prisma.unidade.create({
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
  }

  // Listar todas as unidades
  async listUnidades(filters?: { leadId?: string; codigoDaUnidadeConsumidora?: string }) {
    return prisma.unidade.findMany({
      where: filters || {},
      include: { historicoDeConsumoEmKWH: true },
    });
  }

  // Buscar unidade por ID
  async getUnidadeById(id: string) {
    return prisma.unidade.findUnique({
      where: { id },
      include: { historicoDeConsumoEmKWH: true },
    });
  }
}

export default new UnidadeService();
