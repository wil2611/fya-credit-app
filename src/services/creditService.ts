import type { Credit } from "../models/Credit";
import type { CreateCreditRequest } from "../models/CreateCreditRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const getCredits = async (): Promise<Credit[]> => {
  const response = await fetch(`${API_URL}/api/Credits`);

  if (!response.ok) {
    throw new Error("Failed to load credits");
  }

  return response.json();
};

export const createCredit = async (
  credit: CreateCreditRequest
): Promise<Credit> => {
  const response = await fetch(`${API_URL}/api/Credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credit),
  });

  if (!response.ok) {
    throw new Error("Failed to create credit");
  }

  return response.json();
};