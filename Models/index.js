const dbConfig = require('../Config/db.config.js');

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
const queryInterface = sequelize.getQueryInterface();
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Admin
db.admin = require('./adminModel.js')(sequelize, Sequelize);
db.card = require('./cardController.js')(sequelize, Sequelize);
db.cardsData = require('./cardsdataModel.js')(sequelize, Sequelize);
db.step = require('./stepsModel.js')(sequelize, Sequelize);
db.user = require('./userModel.js')(sequelize, Sequelize);

db.admin.hasMany(db.card, { foreignKey: "adminId", as: "cards" });
db.card.belongsTo(db.admin, { foreignKey: "adminId", as: "admin" });

db.card.hasMany(db.cardsData, { foreignKey: "cardId", as: "cardsDatas", onDelete: "CASCADE" });
db.cardsData.belongsTo(db.card, { foreignKey: "cardId", as: "cards", onDelete: "CASCADE" });

db.card.hasMany(db.step, { foreignKey: "cardId", as: "steps", onDelete: "CASCADE" });
db.step.belongsTo(db.card, { foreignKey: "cardId", as: "cards", onDelete: "CASCADE" });

// queryInterface.removeColumn("users", "password").then((res) => { console.log(res) }).catch((err) => { console.log(err) });
// queryInterface.changeColumn("users", "email", { type: DataTypes.STRING, allowNull: true }).then((res) => { console.log(res) }).catch((err) => { console.log(err) });

module.exports = db;