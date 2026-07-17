import API from "./api";

export const getAllResults = () => {
  return API.get("/api/quizResult/all");
};

export const getUserResults = (userId) => {
  return API.get(`/api/quizResult/?userId=${userId}`);
};

export const submitQuiz = (userId, quizId, answers) => {
  return API.post(
    `/api/quizResult/submit?userId=${userId}&quizId=${quizId}`,
    answers
  );
};