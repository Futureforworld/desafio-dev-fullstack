import { useState } from "react";
import axios from "axios";

const Simular = () => {
  const [form, setForm] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    arquivo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, arquivo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nomeCompleto", form.nomeCompleto);
    formData.append("email", form.email);
    formData.append("telefone", form.telefone);
    if (form.arquivo) formData.append("file", form.arquivo);

    try {
      const response = await axios.post(
        "http://localhost:4000/simulacao",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Simulação registrada com sucesso!");
      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao registrar simulação:", error);
      alert("Falha ao registrar simulação. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nomeCompleto"
        placeholder="Nome Completo"
        value={form.nomeCompleto}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="arquivo"
        onChange={handleFileChange}
        accept="application/pdf"
        required
      />
      <button type="submit">Enviar Simulação</button>
    </form>
  );
};

export default Simular;

