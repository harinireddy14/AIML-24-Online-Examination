import API from "./api";

export const addFeedback = (feedback) => {
  return API.post("/api/feedback/", feedback);
};

export const getUserFeedback = (userId) => {
  return API.get(`/api/feedback/?userId=${userId}`);
};

export const getAllFeedback = () => {
  return API.get("/api/feedback/all");
};

export const deleteFeedback = (feedbackId) => {
  return API.delete(`/api/feedback/${feedbackId}`);
};