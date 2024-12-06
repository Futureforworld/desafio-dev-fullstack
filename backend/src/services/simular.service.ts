import LeadService from './leadService';
import UnidadeService from './unidadeService';

export const registrarNovaSimulacao = async (dados: any) => {
  try {
    console.log('Dados recebidos para simulação:', dados);

    const { nomeCompleto, email, telefone, informacoesDaFatura } = dados;

    // Transformar as informações da fatura para o formato de unidades
    const unidades = informacoesDaFatura.map((fatura: any) => ({
      codigoDaUnidadeConsumidora: fatura.codigoDaUnidadeConsumidora,
      modeloFasico: fatura.modeloFasico,
      enquadramento: fatura.enquadramento,
      historicoDeConsumoEmKWH: fatura.historicoDeConsumoEmKWH,
    }));

    // Registrar um novo lead e suas unidades
    const lead = await LeadService.createLead({
      nomeCompleto,
      email,
      telefone,
      unidades,
    });

    return {
      mensagem: 'Simulação registrada com sucesso!',
      lead,
    };
  } catch (error) {
    console.error('Erro ao registrar simulação:', error);
    throw new Error('Erro ao processar a simulação');
  }
};
