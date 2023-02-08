import { Sequelize, Model, DataTypes } from "sequelize";

class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string
    public phone_number!: string;
    public password!: string;
    public address!: string;
    public state!: string;
    public postal_code!: string;
    public image_key!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public static associate(models: any) {
    //     // Associations to be defined here
    //     User.belongsToMany(models.Seller, {
    //       through: 'SellerAssignment'
    //     })
    // }
}

export default (sequelize: Sequelize) => {
    User.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image_key: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'users',
    });

    return User;
};