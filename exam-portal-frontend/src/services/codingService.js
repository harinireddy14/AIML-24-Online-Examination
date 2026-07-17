import API from "./api";

// Coding Problems

export const getCodingProblems = () => {
  return API.get("/api/coding/");
};

export const addCodingProblem = (problem) => {
  return API.post("/api/coding/", problem);
};

export const deleteCodingProblem = (problemId) => {
  return API.delete(`/api/coding/${problemId}`);
};

// Coding Submissions

export const submitCode = (submission) => {
  return API.post("/api/codingSubmission/", submission);
};

export const getUserSubmissions = (userId) => {
  return API.get(`/api/codingSubmission/?userId=${userId}`);
};

export const getAllSubmissions = () => {
  return API.get("/api/codingSubmission/all");
};

export const evaluateSubmission = (submissionId, marks) => {
  return API.put(`/api/codingSubmission/${submissionId}`, {
    marks: marks,
  });
};
// Run code and get output
export const runCode = (codeData) => {
  return API.post("/api/code/run", codeData);
};
// Submit code and automatically evaluate test cases
export const evaluateCode = (submission) => {
  return API.post("/api/codingEvaluation/submit", submission);
};
// ================================
// CODING TEST CASES
// ================================

// Get test cases for a coding problem
export const getTestCases = (problemId) => {
  return API.get(`/api/codingTestCase/?problemId=${problemId}`);
};

// Add a new test case
export const addTestCase = (testCase) => {
  return API.post("/api/codingTestCase/", testCase);
};

// Delete a test case
export const deleteTestCase = (testCaseId) => {
  return API.delete(`/api/codingTestCase/${testCaseId}`);
};
// Update Coding Problem
export const updateCodingProblem = (problemId, problem) => {
  return API.put(`/api/coding/${problemId}`, problem);
};