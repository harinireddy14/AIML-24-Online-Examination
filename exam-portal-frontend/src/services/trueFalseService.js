import API from "./api";

// Get all True/False questions
export const getTrueFalseQuestions = () => {
  return API.get("/api/trueFalse/");
};

// Add True/False question
export const addTrueFalseQuestion = (question) => {
  return API.post("/api/trueFalse/", question);
};

// Update True/False question
export const updateTrueFalseQuestion = (
  questionId,
  question
) => {
  return API.put(
    `/api/trueFalse/${questionId}`,
    question
  );
};

// Delete True/False question
export const deleteTrueFalseQuestion = (
  questionId
) => {
  return API.delete(
    `/api/trueFalse/${questionId}`
  );
};
// Submit True/False exam
export const submitTrueFalseExam = (userId, answers) => {
  return API.post(
    `/api/trueFalseResult/submit?userId=${userId}`,
    answers
  );
};

// Get True/False results of a student
export const getUserTrueFalseResults = (userId) => {
  return API.get(
    `/api/trueFalseResult/?userId=${userId}`
  );
};

// Admin - Get all True/False results
export const getAllTrueFalseResults = () => {
  return API.get(
    "/api/trueFalseResult/all"
  );
};