module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    date: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Appointment;
};
