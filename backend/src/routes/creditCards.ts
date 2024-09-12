import express from 'express';
import CreditCard from '../models/creditcard.model';
import Bank from '../models/bank.model';

const router = express.Router();

router.get('/',async (req,res)=> {
    const cards = await CreditCard.findAll({include:Bank});
    res.json(cards);
});

router.post('/',async(req,res)=>{
    const {card_name,bank_id} = req.body;
    const card = await CreditCard.create({card_name,bank_id:bank_id});
    res.status(201).json(card);
})

router.put('/:id',async (req,res)=>{
    const {id} = req.params;
    const {card_name,enabled} =req.body;
    const card = await CreditCard.findByPk(id);
    if(card){
        card.update({card_name,enabled});
        res.json(card);
    }else{
        res.status(404).json({message:'Credit Card not found'});
    }
});

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const result = await CreditCard.destroy({where:{id}});
    res.json(result);
});

export default router;