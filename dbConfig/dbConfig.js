module.exports = {
    username: "root",
    host: 'localhost',
    db: "barberShop",
    password: "",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        accurate: 30000,
    }
}