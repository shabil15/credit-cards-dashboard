import React, { useState, useEffect } from "react";
import { CreditCard } from "../types/creditCard";
import { addCreditCard, updateCreditCard } from "../services/creditCardService";
import { toast } from "react-toastify";

interface AddEditProps {
  card: CreditCard | null;
  onClose: () => void;
  onSave: () => void;
}

const AddEditModal: React.FC<AddEditProps> = ({ card, onClose, onSave }) => {
  const [formState, setFormState] = useState<Omit<CreditCard, "id">>({
    bank_name: "",
    card_name: "",
    enabled: true,
    createdAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{
    card_name?: string;
    bank_name?: string;
  }>({});

  const bankOptions = [
    "CS BANK",
    "FEDERAL BANK",
    "AXIS BANK",
    "HDFC BANK",
    "CITY BANK",
    "GRAMIN BANK",
  ];

  useEffect(() => {
    if (card) {
      setFormState({
        bank_name: card.bank_name,
        card_name: card.card_name,
        enabled: card.enabled,
        createdAt: card.createdAt,
      });
    }
  }, [card]);

  const validateForm = () => {
    const newErrors: { card_name?: string; bank_name?: string } = {};
    if (!formState.card_name.trim()) {
      newErrors.card_name = "Card name cannot be empty";
    } else if (formState.card_name.length > 20) {
      newErrors.card_name = "Card name cannot exceed 20 characters";
    }

    if (!formState.bank_name.trim()) {
      newErrors.bank_name = "Bank must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (card) {
        await updateCreditCard(card.id, formState);
        toast.success("Credit card updated successfully!");
      } else {
        await addCreditCard(formState);
        toast.success("New Credit card added successfully!");
      }
      onSave();
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 space-y-4 relative sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl text-white stroke-black  font-bold text-center mb-6">
          {card ? "Edit Credit Card" : "Add Credit Card"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {errors.card_name && (
              <p className="text-red-500 text-xs">{errors.card_name}</p>
            )}
            {errors.bank_name && (
              <p className="text-red-500 text-xs">{errors.bank_name}</p>
            )}
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Credit Card Name
                </label>
                <input
                  type="text"
                  value={formState.card_name}
                  onChange={(e) =>
                    setFormState({ ...formState, card_name: e.target.value })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                    errors.card_name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter card name"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Bank Name
                </label>
                <select
                  value={formState.bank_name}
                  onChange={(e) =>
                    setFormState({ ...formState, bank_name: e.target.value })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                    errors.bank_name ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Bank</option>
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 justify-between sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Enabled
                </label>
                <label className="inline-flex items-center mt-2 relative">
                  <input
                    type="checkbox"
                    checked={formState.enabled}
                    onChange={() =>
                      setFormState({
                        ...formState,
                        enabled: !formState.enabled,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer flex items-center transition-colors duration-300">
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        formState.enabled ? "translate-x-6 bg-indigo-600" : ""
                      }`}
                    />
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Created At
                </label>
                <input
                  type="text"
                  value={
                    card
                      ? new Date(card.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "---"
                  }
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400 transition"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
