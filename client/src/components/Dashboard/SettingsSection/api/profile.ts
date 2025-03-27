import type { UserProfile } from "../types/settings";
import { API_URL } from "../../../../config/api.config";

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}settings/profile`, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await response.json();
  return {
    username: data.username,
    email: data.email,
    profile: {
      bio: data.profile?.bio || "",
    },
  };
};

export const updateUserProfile = async (data: UserProfile, token: string) => {
  const response = await fetch(`${API_URL}settings/profile`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};
