import API from "./api";

export const getQuizzes = () => {
  return API.get("/api/quiz/");
};

export const addQuiz = (quiz) => {
  return API.post("/api/quiz/", quiz);
};

export const deleteQuiz = (id) => {
  return API.delete(`/api/quiz/${id}`);
};

export const updateQuiz = (id, quiz) => {
  return API.put(`/api/quiz/${id}`, quiz);
};

export const getQuizById = (id) => {
  return API.get(`/api/quiz/${id}`);
};