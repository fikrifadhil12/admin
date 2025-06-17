import axios from "axios";

// Ganti dengan URL Glitch Anda
const API_BASE_URL = "https://panoramic-free-dugong.glitch.me";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fungsi untuk mengambil data pesanan dari Neon DB
export const fetchOrders = async () => {
  try {
    const response = await api.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil pesanan:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data pengguna
export const fetchUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data pengguna:", error);
    throw error;
  }
};
