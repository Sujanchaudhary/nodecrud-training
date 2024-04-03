const dbConfig = require("../dbConfig/dbConfig.js");
const Sequelize = require("sequelize");
const auth = require("./../model/auth.js");

const sequelize = new Sequelize(
  dbConfig.db,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      accurate: dbConfig.pool.accurate,
      idle: dbConfig.pool.idle,
    },
  }
);

// Function to create admin user
async function createAdminUser() {
  try {
    // Check if any admin user exists
    const adminUser = await auth.findOne({ where: { isAdmin: true } });

    // If no admin user found, create one
    if (!adminUser) {
      await auth.create({
        username: "admin",
        password: "admin123", // You should hash passwords in a real application
        isAdmin: true,
      });
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database successfully");
    createAdminUser();
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogs = require("./barber.js")(sequelize, Sequelize);
db.auth = require("./../model/auth.js")(sequelize, Sequelize);
db.appointment = require("./../model/appointment.js")(sequelize, Sequelize);
db.profile = require("./../model/profile.js")(sequelize, Sequelize);

db.auth.hasMany(db.appointment);
db.appointment.belongsTo(db.auth);

db.auth.hasOne(db.profile);
db.profile.belongsTo(db.auth);

module.exports = db;
