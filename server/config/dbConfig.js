const { DataSource } = require("typeorm");
const User = require('../model/user')
const Employee = require('../model/employee')
const CarModel = require('../model/carModel')
const Sale = require('../model/sale')

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "myapp",
    synchronize: true,
    logging: false,
    dropSchema: true, 
    entities: [User, Employee, CarModel, Sale],
    migrations: [],
    subscribers: [],
});

module.exports = AppDataSource;