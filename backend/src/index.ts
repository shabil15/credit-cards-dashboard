import express from 'express';
import sequelize from './config/db.config';

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Credit cards Dashboard backend');
});

const PORT = process.env.PORT || 9000;

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => console.log('Error: ', err));