const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Message=sequelize.define('message',{
    id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    message:Sequelize.STRING,
    name:Sequelize.STRING
})

module.exports=Message;