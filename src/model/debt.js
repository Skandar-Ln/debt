const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const {syncTable} = require('./util');

const Message = sequelize.define('message', {
    changed: Sequelize.DECIMAL(10, 2),
    // from: Sequelize.STRING,
    // to: Sequelize.STRING,
    isAdd: Sequelize.BOOLEAN,
    left: Sequelize.DECIMAL(10, 2),
    remark: Sequelize.STRING
});

syncTable(Message);

module.exports = Message;
