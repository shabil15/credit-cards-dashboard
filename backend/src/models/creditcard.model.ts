import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Bank from "./bank.model";


const CreditCard = sequelize.define('CreditCard',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    card_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
});

CreditCard.belongsTo(Bank);
export default CreditCard;