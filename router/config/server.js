// import Sequelize from 'sequelize'
const Sequelize = require("sequelize");
const sequelizeObject = new Sequelize('activity', 'root', '5211314mxx', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
//# sourceMappingURL=server.js.map