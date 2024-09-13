import React from 'react';
import { CreditCard } from '../types/creditCard';
import { deleteCreditCard } from '../services/creditCardService';
import { toast } from "react-toastify";

interface DeleteModalProps {
  card: CreditCard | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ card, onClose, onDelete }) => {
  const handleDelete = async () => {
    if (card) {
      await deleteCreditCard(card.id);
      toast.success("Credit card deleted successfully!");
      onDelete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="relative p-6 w-80 rounded-3xl shadow-lg backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Confirm Deletion</h2>
        <p className="text-center mb-6 text-white">Are you sure?</p>
        <hr className="border-gray-400 border-opacity-30 mb-4" />
        <div className="flex">
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 bg-opacity-70 text-white py-2 rounded-bl-xl hover:bg-opacity-90 transition duration-200"
          >
            Yes
          </button>
          <div className="w-px bg-white bg-opacity-30"></div>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 bg-opacity-50 text-white py-2 rounded-br-xl hover:bg-opacity-70 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
