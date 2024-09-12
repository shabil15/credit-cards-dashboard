import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const CreditCard = sequelize.define('CreditCard',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    card_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
});


export default CreditCard;