import React, { useState, useEffect } from "react";
import { CreditCard } from "../types/creditCard";
import { getCreditCards } from "../services/creditCardService";
import AddEditModal from "./addEditModal";
import DeleteModal from "./deleteModal";
import { IoIosSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreditCards: React.FC = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, setTotalItems] = useState<number>(0);

  const fetchCreditCards = async (page: number, search: string) => {
    try {
      const response = await getCreditCards(page, search);
      setCreditCards(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to fetch credit cards", error);
      toast.error("Failed to fetch credit cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditCards(page, search);
  }, [page, search]);

  const handleAddEdit = (card: CreditCard | null) => {
    setSelectedCard(card);
    setShowAddEditModal(true);
  };

  const handleDelete = (card: CreditCard) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setSelectedCard(null);
    setShowAddEditModal(false);
    setShowDeleteModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="container px-4">
       <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Credit Cards
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="glassmorphism-input w-full md:w-64 pr-12 pl-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
            <span className="absolute right-4 top-2 text-gray-500">
              <IoIosSearch />
            </span>
          </div>
          <button
            className="bg-gradient-to-r from-slate-500 to-slate-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-white/30 transition duration-300 w-full md:w-auto"
            onClick={() => handleAddEdit(null)}
          >
            Add Card
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg backdrop-blur-md bg-white/30 p-4 rounded-3xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-center text-white">
            <tr>
              <th className="py-2 px-4 text-sm font-semibold">ID</th>
              <th className="py-2 px-4 text-sm font-semibold">Bank</th>
              <th className="py-2 px-4 text-sm font-semibold">Name</th>
              <th className="py-2 px-4 text-sm font-semibold">Enabled</th>
              <th className="py-2 px-4 text-sm font-semibold">Created At</th>
              <th className="py-2 px-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {creditCards.map((card) => (
              <tr key={card.id}>
                <td className="px-4 py-2 text-sm">{card.id}</td>
                <td className="px-4 py-2 text-sm">{card.bank_name}</td>
                <td className="px-4 py-2 text-sm">{card.card_name}</td>
                <td className="px-4 py-2 text-sm">
                  <input
                    type="checkbox"
                    checked={card.enabled}
                    readOnly
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(card.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 text-sm flex justify-center space-x-2">
                  <button
                    className="bg-gradient-to-r from-blue-400 to-violet-300 text-gray px-6 py-1 rounded-full shadow-md transition duration-300"
                    onClick={() => handleAddEdit(card)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-700 hover:to-red-500 text-white px-6 py-2 rounded-full shadow-md transition duration-700"
                    onClick={() => handleDelete(card)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none"
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  page === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-400 hover:text-white transition`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none"
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showAddEditModal && (
        <AddEditModal
          card={selectedCard}
          onClose={handleModalClose}
          onSave={() => fetchCreditCards(page, search)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          card={selectedCard}
          onClose={handleModalClose}
          onDelete={() => fetchCreditCards(page, search)}
        />
      )}
    </div>
  );
};

export default CreditCards;
