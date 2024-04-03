// profile.model.js

module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.INTEGER,
    },
    // Add other fields as needed
  });

  return Profile;
};
