import {DataTypes, Model} from 'sequelize';
import sequelize from '../connection/database';

export class Seller extends Model {}

Seller.init({
    // Model attributes are defined here
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    store_id: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_key: {
      type: DataTypes.STRING,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Seller' 
  });