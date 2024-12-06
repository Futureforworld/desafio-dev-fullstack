import React, { useState } from 'react';

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    campo1: '',
    campo2: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Campo 1:
        <input
          type="text"
          value={formData.campo1}
          onChange={(e) => setFormData({ ...formData, campo1: e.target.value })}
        />
      </label>
      <label>
        Campo 2:
        <input
          type="text"
          value={formData.campo2}
          onChange={(e) => setFormData({ ...formData, campo2: e.target.value })}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
