import React, { useState, useEffect } from 'react';
import { CreditCard } from '../types/creditCard';
import { getCreditCards } from '../services/creditCardService';

const CreditCards: React.FC = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const cards = await getCreditCards();
        setCreditCards(cards);
      } catch (error) {
        console.error('Failed to fetch credit cards', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditCards();
  }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Credit Cards</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Card
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Bank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Enabled</th>
            <th className="py-2">Created At</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {creditCards.map((card) => (
            <tr key={card.id}>
              <td className="border px-4 py-2">{card.id}</td>
              <td className="border px-4 py-2">{card.bankName}</td>
              <td className="border px-4 py-2">{card.cardName}</td>
              <td className="border px-4 py-2">
                <input type="checkbox" checked={card.enabled} readOnly />
              </td>
              <td className="border px-4 py-2">{new Date(card.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button
                  
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditCards;
