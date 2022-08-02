const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Actividad', { //define esta tabla 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    dificultad:{
        type: DataTypes.INTEGER,
        validate:{
          min: 1,
          max: 5,
        },
        allowNull:true,
    },
    duracion:{
        type: DataTypes.STRING,
        allowNull:true,
    },
   temporada:{
    type:DataTypes.ENUM('Verano', 'Otoño', 'Invierno' ,'Primavera'),
    allowNull:true,
    },
  });
};