
import express from 'express';
import sequelize from './config/db.config';
import crediCardRoutes from './routes/creditCards';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/credit-cards',crediCardRoutes);

app.get('/',(req,res)=>{
    res.send('Credit cards Dashboard backend');
});

const PORT = process.env.PORT || 9000;

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}` );
    });
  })
  .catch((err) => console.log('Error: ', err));