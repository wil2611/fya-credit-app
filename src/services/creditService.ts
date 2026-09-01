import type { Credit } from "../models/Credit";
import type { CreateCreditRequest } from "../models/CreateCreditRequest";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreditFilters {
  clientName?: string;
  clientDocument?: string;
  salesperson?: string;
  sortBy?: "amount" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const getCredits = async (
  filters: CreditFilters = {}
): Promise<Credit[]> => {
  const params = new URLSearchParams();

  if (filters.clientName) {
    params.append("clientName", filters.clientName);
  }

  if (filters.clientDocument) {
    params.append("clientDocument", filters.clientDocument);
  }

  if (filters.salesperson) {
    params.append("salesperson", filters.salesperson);
  }

  if (filters.sortBy) {
    params.append("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.append("sortOrder", filters.sortOrder);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/api/Credits?${queryString}`
    : `${API_URL}/api/Credits`;

  const response = await fetch(url);

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