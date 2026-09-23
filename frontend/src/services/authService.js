import { apiFetch } from "../utils/api";

export const registerUser = async (name, email, password) => {
  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};



export const loginUser = async (email, password) => {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};
export const getMe = async () => {
  const response = await apiFetch("/users/me");

  if (!response.ok) {
    throw new Error("Not authorized");
  }

  return response.json();
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};