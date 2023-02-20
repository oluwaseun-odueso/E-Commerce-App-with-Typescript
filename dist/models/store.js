"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../connection/database"));
class Store extends sequelize_1.Model {
}
exports.Store = Store;
Store.init({
    // Model attributes are defined here
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    seller_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image_key: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    // Other model options go here
    sequelize: database_1.default,
    modelName: 'Store'
});
