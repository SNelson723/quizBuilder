import { Sequelize, DataTypes } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const db = new Sequelize({
  dialect: PostgresDialect,
  database: 'quizzia',
  user: 'postgres',
  password: 'WojtekCircus4126!',
  host: 'localhost',
  port: 5432
});

try {
  await db.authenticate();
  console.log('Connection to PostgreSQL has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Define your models
const User = db.define('User', {
  userId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Synchronize the models with the database
db.sync({ force: true }) // Use force: true only in development
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


  export { db as sequelize, User };