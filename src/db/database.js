const Sequelize = require('sequelize');
const {DATABASE} = require('../../config.json');

let database = DATABASE.name;

if (process.env.NODE_ENV === 'dev') {
    database = `${DATABASE.name}_test`;
}

const sequelize = new Sequelize(database, DATABASE.user, DATABASE.password, {
    host: DATABASE.host,
    dialect: 'mysql'
});

const hearBeat = () => setTimeout(() => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection hearBeat');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    hearBeat();
}, 60 * 10 * 1000);

module.exports = sequelize;
