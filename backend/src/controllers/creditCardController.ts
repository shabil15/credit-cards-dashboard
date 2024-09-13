import { Request, Response } from "express";
import CreditCard from "../models/creditcard.model";
import { Op, WhereOptions } from "sequelize";


//Fetches credit cards from the database with optional pagination and search functionality.
export const getCreditCards = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit as string) || 7));
    const search = (req.query.search as string) || "";

    const offset = (page - 1) * limit;

    let whereClause: WhereOptions = {};
    if (search.trim() !== "") {
      whereClause = {
        [Op.or]: [
          { bank_name: { [Op.like]: `%${search}%` } },
          { card_name: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows: creditCards } = await CreditCard.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      creditCards,
      currentPage: page,
      totalPages,
      totalItems: count,
      itemsPerPage: limit,
      searchTerm: search
    });
  } catch (error) {
    console.error("Error in getCreditCards:", error);
    res.status(500).json({ message: "Error fetching credit cards", error: error });
  }
};

// Adds a new credit card to the database.
export const addCreditCard = async (req: Request, res: Response) => {
  const { bank_name, card_name, enabled } = req.body;
  try {
    const newCard = await CreditCard.create({ bank_name, card_name, enabled });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating credit card" });
  }
};

//Updates an existing credit card in the database.
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

//Deletes a credit card from the database.
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
