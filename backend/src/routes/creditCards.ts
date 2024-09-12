import express from 'express';
import { getCreditCards, addCreditCard, updateCreditCard, deleteCreditCard } from '../controllers/creditCardController';

const router = express.Router();

router.get('/',getCreditCards);
router.post('/',addCreditCard);
router.put('/:id',updateCreditCard);
router.delete('/:id',deleteCreditCard);

export default router;