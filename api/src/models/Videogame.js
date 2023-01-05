const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          notEmpty: true,
          msg: "El campo no puede estar vacio, ingrese un nombre",
        },
        len: {
          args: [3, 50],
          msg: "The name must have between 3 and 50 characters",
        },
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio, ingrese un resumen",
        },
        len: {
          args: [10, 500],
          msg: "Description must be between 10 and 500 characters",
        }
  
        
      }
    },

    released: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio",
        },
        len: {
          args: [10],
          msg: "Released: The Date must be in the format YYYY-MM-DD",
        }
  
        
      }
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio",
        },
        isDecimal: {
          msg: "Rating: must be a number between 0.1 and 5.0"
        },
        min: 0.1,
        max: 5.0
  
        
      }
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          
          msg: "El campo no puede estar vacio",
        },
        isArray(data){
          if(data.length === 0){
            throw new Error('Platforms: Select one or more platforms')
          }
        }
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: {
          msg: 'Image: must be a valid URL',
          args: [{ 
            protocols: ['https'],
            require_valid_protocol: true,
            require_protocol: true
          }] 
        }
      }
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    }

  });
};
