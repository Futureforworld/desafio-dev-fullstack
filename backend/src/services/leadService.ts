import prisma from '../prismaClient';
import { Lead, Unidade } from '@prisma/client';

class LeadService {
  // Criar um novo lead
  async createLead(data: {
    nomeCompleto: string;
    email: string;
    telefone: string;
    unidades: Unidade[];
  }): Promise<Lead> {
    const { nomeCompleto, email, telefone, unidades } = data;

    // Validar se o email já existe
    const existingLead = await prisma.lead.findUnique({
      where: { email },
    });
    if (existingLead) {
      throw new Error('Email já cadastrado');
    }

    // Criar o lead e suas unidades associadas
    const lead = await prisma.lead.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        unidades: {
          create: unidades,
        },
      },
    });

    return lead;
  }

  // Listar todos os leads
  async listLeads(filters?: { email?: string; nomeCompleto?: string }) {
    return prisma.lead.findMany({
      where: filters || {},
      include: { unidades: true },
    });
  }

  // Buscar lead por ID
  async getLeadById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: { unidades: true },
    });
  }
}

export default new LeadService();
