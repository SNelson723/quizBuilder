import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const db = new Sequelize({
  dialect: PostgresDialect,
  database: 'quizzia',
  username: 'postgres',
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

export default db;