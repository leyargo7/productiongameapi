const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio",
        },
        isAlpha: {
          args: true,
          msg: "El genre solo puede contener letras",
        },
        len: {
          args: [3, 50],
          msg: "El genre debe tener entre 3 y 50 caracteres",
        },
      },
    },
  });
};