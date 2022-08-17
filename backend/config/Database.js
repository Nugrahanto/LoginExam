import {Sequelize} from "sequelize";

const db = new Sequelize('loginexam','root','',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;