import API from "./api";

// Get user profile
export const getUserProfile = (userId) => {
  return API.get(`/api/users/${userId}`);
};

// Update user profile
export const updateUserProfile = (
  userId,
  profileData
) => {
  return API.put(
    `/api/users/${userId}`,
    profileData
  );
};