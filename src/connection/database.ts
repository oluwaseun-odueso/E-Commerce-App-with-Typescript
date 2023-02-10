import { Sequelize} from 'sequelize';
require('dotenv').config();

const database = process.env.SQ_DATABASE;
const user = process.env.SQ_USER;
const password = process.env.SQ_PASSWORD;

if (!database || !user || !password) {
  throw new Error('Missing required environment variables for database connection');
};

const sequelize = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'mysql'
  });

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error: any) => console.log('Unable to connect to the database:', error))

export default sequelize