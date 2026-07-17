import API from "./api";

export const getUserAttendance = (userId) => {
  return API.get(`/api/attendance/?userId=${userId}`);
};

export const getAllAttendance = () => {
  return API.get("/api/attendance/all");
};