import React from 'react';
import { CreditCard } from '../types/creditCard';
import { deleteCreditCard } from '../services/creditCardService';

interface DeleteModalProps {
    card:CreditCard | null;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ card, onClose, onDelete }) => {

    const handleDelete = async () => {
        if(card){
        await deleteCreditCard(card.id);
        onDelete();
        onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className='text-xl mb-4'>Confirm Deletion </h2>
            <p className='mb-4'>Are you sure ?</p>
            <div className="flex justify-between">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
        </div>
          </div>
        </div>
        
    )
}

export default DeleteModal;