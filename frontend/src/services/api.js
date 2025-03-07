import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("/users/register", {
    username,
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post("/todos", todoData);
  return response.data;
};

export default api;
