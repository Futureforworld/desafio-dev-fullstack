import { Unidade } from './Unidade';

export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
}
