module.exports = (sequelize, Sequelize) => {
    const Barber = sequelize.define("barber", {
      name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      });
  
    return Barber;
  };