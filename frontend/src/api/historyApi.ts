
import axios from "axios";

const API_URL = "https://hiresense-ai-yjuo.onrender.com";

export const getHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};