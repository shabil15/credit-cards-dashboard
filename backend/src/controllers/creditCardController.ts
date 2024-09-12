import { Request, Response } from "express";
import CreditCard from "../models/creditcard.model";

export const getCreditCards = async (req: Request, res: Response) => {
  try {
    const creditCards = await CreditCard.findAll();
    res.json(creditCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching credit cards" });
  }
};

export const addCreditCard = async (req: Request, res: Response) => {
  const { bank_name, card_name, enabled } = req.body;
  try {
    const newCard = await CreditCard.create({ bank_name, card_name, enabled });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating credit card" });
  }
};

export const updateCreditCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bank_name, card_name, enabled } = req.body;
  try {
    const card = await CreditCard.findByPk(id);
    if (card) {
      card.update({ bank_name, card_name, enabled });
      res.json(card);
    } else {
      res.status(404).json({ message: "Credit card not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating credit card" });
  }
};

export const deleteCreditCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const card = await CreditCard.findByPk(id);
    if (card) {
      await card.destroy();
      res.json({ message: "Credit card deleted successfully" });
    } else {
      res.status(404).json({ message: "Credit card not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting credit card" });
  }
};
