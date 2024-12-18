import { Sequelize, DataTypes } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.VITE_DB_NAME,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PW,
  host: process.env.VITE_DB_HOST,
  port: process.env.VITE_DB_PORT
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
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

const UserScore = db.define('UserScore', {
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

const Achievement = db.define('Achievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iconUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateEarned: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
});

const UserAchievements = db.define('UserAchievement', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  achievementId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dateEarned: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
});

const QuizComment = db.define('QuizComment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  datePosted: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isFlagged: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const QuizCommentResponse = db.define('QuizCommentResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  commentId: {
    type: DataTypes.INTEGER,
    alowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  datePosted: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isFlagged: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// Profile tables
const UserProfile = db.define('UserProfile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  locationFrom: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  favoriteGenre: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allownull: true,
    defaultValue: ''
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const Friend = db.define('Friend', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: User,
      key: 'userId'
    }
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: User,
      key: 'userId'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
});

const DirectMessage = db.define('DirectMessage', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  }
});

// Relationships
User.hasMany(UserScore, { foreignKey: 'userId' });
UserScore.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Leaderboard, { foreignKey: 'userId' });
Leaderboard.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserAchievements, { foreignKey: 'userId' });
Achievement.hasMany(UserAchievements, { foreignKey: 'achievementId' });

User.hasMany(QuizComment, { foreignKey: 'userId' });
QuizComment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(QuizCommentResponse, { foreignKey: 'userId' });
QuizCommentResponse.belongsTo(User, { foreignKey: 'userId' });
QuizComment.hasMany(QuizCommentResponse, { foreignKey: 'commentId' });
QuizCommentResponse.belongsTo(QuizComment, { foreignKey: 'commentId' });

User.hasOne(UserProfile, { foreignKey: 'userId'});
UserProfile.belongsTo(User, { foreignKey: 'userId'});

// Synchronize the models with the database
db.sync({alter: true})
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  });

  export {
    db as sequelize,
    User,
    UserScore,
    Leaderboard,
    Achievement,
    UserAchievements,
    QuizComment,
    QuizCommentResponse,
    UserProfile,
    Friend,
    DirectMessage
  };