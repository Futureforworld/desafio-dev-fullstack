import { Unidade } from './Unidade';

export class Lead {
  id: string;
  email: string;
  nomeCompleto: string;
  telefone: string;
  unidades: Unidade[];

  constructor(id: string = '', email: string = '', nomeCompleto: string = '', telefone: string = '', unidades: Unidade[] = []) {
    this.id = id;
    this.email = email;
    this.nomeCompleto = nomeCompleto;
    this.telefone = telefone;
    this.unidades = unidades;
  }
}
