import { Lead } from './Lead';

export interface Simulacao {
  id: number;
  descricao: string;
  data: Date;
  status: string;
  lead: Lead; // Associar a simulação a um lead, se aplicável
}
