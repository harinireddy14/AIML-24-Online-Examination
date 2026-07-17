import API from "./api";

export const getCategories = () => {
  return API.get("/api/category/");
};

export const addCategory = (category) => {
  return API.post("/api/category/", category);
};

export const updateCategory = (id, category) => {
  return API.put(`/api/category/${id}`, category);
};

export const deleteCategory = (id) => {
  return API.delete(`/api/category/${id}`);
};