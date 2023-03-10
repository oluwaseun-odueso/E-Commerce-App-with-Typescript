import {DataTypes, Model } from 'sequelize';
import sequelize from '../connection/database';

export class User extends Model {}

User.init({
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postal_code : {
    type: DataTypes.INTEGER,
  },
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_key: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' 
});


