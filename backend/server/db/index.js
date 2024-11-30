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
  userName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const UserScores = db.define('UserScore', {
  scoreId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Leaderboard = db.define('Leaderboard', {
  overallScore: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topCategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relationships
User.hasMany(UserScores, { foreignKey: 'userId' });
UserScores.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Leaderboard, { foreignKey: 'userId'});
Leaderboard.belongsTo(User, { foreignKey: 'userId'});

// Synchronize the models with the database
db.sync({alter: true})
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


  export { db as sequelize, User, UserScores, Leaderboard };