import axios from "axios";
import { CreditCard, Bank } from "../types/creditCard";

const API_URL = "http://localhost:8000/api";

export const getCreditCards = async (): Promise<CreditCard[]> => {
  const response = await axios.get(`${API_URL}/credit-cards`);
  return response.data;
};

export const addCreditCard = async (
  card: Omit<CreditCard, "id">
): Promise<CreditCard> => {
  const response = await axios.post(`${API_URL}/credit-cards`, card, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateCreditCard = async (
  id: number,
  card: Omit<CreditCard, "id">
): Promise<CreditCard> => {
  const response = await axios.put(`${API_URL}/credit-cards/${id}`, card, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteCreditCard = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/credit-cards/${id}`);
};

export const getBanks = async (): Promise<Bank[]> => {
  const response = await axios.get(`${API_URL}/banks`);
  return response.data;
};
