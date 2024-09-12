import React,{useState,useEffect} from 'react';
import { CreditCard,Bank } from '../types/creditCard';
import { addCreditCard,updateCreditCard,getBanks } from '../services/creditCardService';

interface AddEditProps {
  card: CreditCard | null;
  onClose: () => void;
  onSave: ()=> void;
}

const AddEditModal: React.FC<AddEditProps> = ({ card, onClose }) => {
  const [formState, setFormState] = useState<Omit<CreditCard, 'id'>>({
    bank_name: '',
    card_name: '',
    enabled: true,
    createdAt: new Date().toISOString(),
  });
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bankList = await getBanks();
        setBanks(bankList);
      } catch (error) {
        console.error('Failed to fetch banks', error);
      }
    };

    fetchBanks();

    if (card) {
      setFormState({
        bank_name: card.bank_name,
        card_name: card.card_name,
        enabled: card.enabled,
        createdAt: card.createdAt,
      });
    }
  }, [card]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (card) {
      await updateCreditCard(card.id, formState);
    } else {
      await addCreditCard(formState);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{card ? 'Edit Credit Card' : 'Add Credit Card'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Credit Card Name</label>
            <input
              type="text"
              value={formState.card_name}
              onChange={(e) => setFormState({ ...formState, card_name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Bank Name</label>
            <select
              value={formState.bank_name}
              onChange={(e) => setFormState({ ...formState, bank_name: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm">Enabled</label>
            <input
              type="checkbox"
              checked={formState.enabled}
              onChange={() => setFormState({ ...formState, enabled: !formState.enabled })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Created At</label>
            <input
              type="text"
              value={new Date(formState.createdAt).toLocaleDateString()}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
