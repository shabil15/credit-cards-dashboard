import express from 'express';

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Credit cards Dashboard backend');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
