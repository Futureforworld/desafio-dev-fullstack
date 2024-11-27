const API_BASE_URL = "http://localhost:3000";

export const simularEnergia = async (data) => {
  const response = await fetch(`${API_BASE_URL}/simular`, {
    method: "POST",
    body: data,
  });
  return response.json();
};
