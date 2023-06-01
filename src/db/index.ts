import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.DB_URL}`, {
    dialect: 'postgres',
    pool: {
        max: 25,
        idle: 30000,
        acquire: 2000
    },
    logging: false
});

const sync = async () => {
    await sequelize.sync();
};

export default {
    sequelize,
    sync,
};