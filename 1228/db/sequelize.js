//sequelizeとは、Node.jsでデータベースを操作するためのORMツールです。
const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: 'path/to/database.sqlite'
});

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
   host: 'localhost',
   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

//authenticate()とは、データベースに接続できるかどうかを確認するメソッドです。
try {
   await sequelize.authenticate();
   console.log('Connection has been established successfully.');
} catch (error) {
   console.error('Unable to connect to the database:', error);
}

const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Code here! It works!

const sequelize = new Sequelize('sqlite::memory:', {
   // Choose one of the logging options
   logging: console.log,                  // Default, displays the first parameter of the log function call
   logging: (...msg) => console.log(msg), // Displays all log function call parameters
   logging: false,                        // Disables logging
   logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
   logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
});

//sequelize.define()とは、モデルを定義するメソッドです。
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
   // Model attributes are defined here
   firstName: {
      type: DataTypes.STRING,
      allowNull: false
   },
   lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
   }
}, {
   // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model { }

User.init({
   // Model attributes are defined here
   firstName: {
      type: DataTypes.STRING,
      allowNull: false
   },
   lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
   }
}, {
   // Other model options go here
   sequelize, // We need to pass the connection instance
   modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

// Valid
class User extends Model {
   declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
}

User.init({
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   }
}, { sequelize });

const user = new User({ id: 1 });
user.id; // 1


//sequelize.sync()とは、モデルをデータベースに同期するメソッドです。
const sequelize = new Sequelize('sqlite::memory:', {
   define: {
      freezeTableName: true
   }
});

sequelize.define('User', {
   // ... (attributes)
}, {
   timestamps: false
});

//initializing modelsとは、モデルを初期化するメソッドです。
const { Sequelize, Model, DataTypes } = require('sequelize');
class Foo extends Model { }
Foo.init({ /* attributes */ }, {
   sequelize,

   // don't forget to enable timestamps!
   timestamps: true,

   // I don't want createdAt
   createdAt: false,

   // I want updatedAt to actually be called updateTimestamp
   updatedAt: 'updateTimestamp'
});

// This:
sequelize.define('User', {
   name: {
      type: DataTypes.STRING
   }
});

// Can be simplified to:
sequelize.define('User', { name: DataTypes.STRING });

