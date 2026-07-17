import API from "./api";

export const getQuestions = () => {
  return API.get("/api/question/");
};

export const getQuestionsByQuiz = (quizId) => {
  return API.get(`/api/question/?quizId=${quizId}`);
};

export const addQuestion = (question) => {
  return API.post("/api/question/", question);
};

export const deleteQuestion = (id) => {
  return API.delete(`/api/question/${id}`);
};

export const updateQuestion = (id, question) => {
  return API.put(`/api/question/${id}`, question);
};