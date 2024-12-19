import React, { useState } from 'react';
import axios from 'axios';

const SimulacaoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    contaDeEnergia: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, contaDeEnergia: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.contaDeEnergia);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/simulacao`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Simulação realizada com sucesso:', response.data);
      alert(response.data.mensagem);
    } catch (error) {
      console.error('Erro ao enviar simulação:', error);
      alert('Erro ao enviar o arquivo. Tente novamente.');
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nomeCompleto"
        placeholder="Nome completo"
        value={formData.nomeCompleto}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleInputChange}
        required
      />
      <input type="file" name="file" onChange={handleFileChange} required />
      <button type="submit">Submeter</button>
    </form>
  );
};

export default SimulacaoForm;



