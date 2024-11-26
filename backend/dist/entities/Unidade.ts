import { Consumo } from './Consumo';
import { Lead } from './Lead';

export class Unidade {
  id: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
  enquadramento: string;
  lead?: Lead;
  historicoDeConsumoEmKWH: Consumo[];

  constructor(id: string = '', codigoDaUnidadeConsumidora: string = '', modeloFasico: 'monofasico' | 'bifasico' | 'trifasico' = 'monofasico', enquadramento: string = '', lead?: Lead, historicoDeConsumoEmKWH: Consumo[] = []) {
    this.id = id;
    this.codigoDaUnidadeConsumidora = codigoDaUnidadeConsumidora;
    this.modeloFasico = modeloFasico;
    this.enquadramento = enquadramento;
    this.lead = lead;
    this.historicoDeConsumoEmKWH = historicoDeConsumoEmKWH;
  }
}
