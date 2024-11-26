import { Unidade } from './Unidade';

export class Consumo {
  id: string;
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
  unidade: Unidade | undefined;

  constructor(id: string = '', consumoForaPontaEmKWH: number = 0, mesDoConsumo: Date = new Date(), unidade?: Unidade) {
    this.id = id;
    this.consumoForaPontaEmKWH = consumoForaPontaEmKWH;
    this.mesDoConsumo = mesDoConsumo;
    this.unidade = unidade;
  }
}
