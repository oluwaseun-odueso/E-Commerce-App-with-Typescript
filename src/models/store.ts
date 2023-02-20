import {DataTypes, Model } from 'sequelize';
import sequelize from '../connection/database';

export class Store extends Model {}

Store.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_key: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Store' 
});


