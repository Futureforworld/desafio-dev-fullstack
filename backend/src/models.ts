export interface Lead {
    id: string;
    nomeCompleto: string;
    email: string;
    telefone: string;
    unidades: Array<{
      id: string;
      codigoDaUnidadeConsumidora: string;
      modeloFasico: string;
      enquadramento: string;
      historicoDeConsumoEmKWH: Array<{
        consumoForaPontaEmKWH: number;
        mesDoConsumo: Date;
      }>;
    }>;
  }
  
  export interface SolicitarSimulacaoDeCompensacaoEnergeticaInput {
    nomeCompleto: string;
    email: string;
    telefone: string;
    informacoesDaFatura: {
      unidades: Array<{
        id: string;
        consumoEstimado: number;
      }>;
    };
  }
  