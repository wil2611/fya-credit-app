import type { Credit } from "../models/Credit";

const API_URL = import.meta.env.VITE_API_URL;

export const getCredits = async (): Promise<Credit[]> => {
  const response = await fetch(`${API_URL}/api/Credits`);

  if (!response.ok) {
    throw new Error("Failed to load credits");
  }

  return response.json();
};