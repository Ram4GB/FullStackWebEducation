const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', '', {
    // custom host; default: localhost
    //host: '127.0.0.1',
    // the sql dialect of the database
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        timestamps: false
    }
});

let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;