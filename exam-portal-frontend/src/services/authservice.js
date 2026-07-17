import API from "./api";

export const loginUser = (data) => {
  return API.post("/api/login", data);
};

export const registerUser = (data) => {
  return API.post("/api/register", data);
};