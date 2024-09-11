import express from 'express';
import Bank from '../models/bank.model'

const router = express.Router();

router.get('/',async(req,res)=>{
    const banks = await Bank.findAll();
    res.json(banks);
})

export default router;