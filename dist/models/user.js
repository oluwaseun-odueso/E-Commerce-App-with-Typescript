"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../connection/database"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    // Model attributes are defined here
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    hashed_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image_key: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    // Other model options go here
    sequelize: database_1.default,
    modelName: 'User'
});
