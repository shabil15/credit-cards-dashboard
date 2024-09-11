import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Bank = sequelize.define('Bank',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});

export default Bank;