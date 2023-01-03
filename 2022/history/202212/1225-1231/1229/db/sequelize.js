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


//sequelize.defineとは、モデルを定義するためのメソッドです。モデルとは、データベースのテーブルを表すオブジェクトです。モデルを定義することで、そのモデルに対してCRUD操作を行うことができます。
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

// Invalid
class User extends Model {
   id; // this field will shadow sequelize's getter & setter. It should be removed.
   otherPublicField; // this field does not shadow anything. It is fine.
}

User.init({
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   }
}, { sequelize });

const user = new User({ id: 1 });
user.id; // undefined

sequelize.define('User', {
   // ... (attributes)
}, {
   freezeTableName: true
});

sequelize.define('User', {
   // ... (attributes)
}, {
   tableName: 'Employees'
});

await User.drop();
console.log("User table dropped!");

// This will run .sync() only if database name ends with '_test'
sequelize.sync({ force: true, match: /_test$/ });

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

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

//sequelize.defineとは、モデルを定義するためのメソッドです。モデルとは、データベースのテーブルを表すオブジェクトです。モデルを定義することで、そのモデルに対してCRUD操作を行うことができます。
const User = sequelize.define("user", {
   name: DataTypes.TEXT,
   favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: 'green'
   },
   age: DataTypes.INTEGER,
   cash: DataTypes.INTEGER
});

(async () => {
   await sequelize.sync({ force: true });
   // Code here
})();

//jane.save()とは、janeというインスタンスをデータベースに保存するためのメソッドです。jane.save()を実行すると、janeというインスタンスがデータベースに保存されます。
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// the name is still "Jane" in the database
await jane.save();
// Now the name was updated to "Ada" in the database!

//jane.destroy()とは、janeというインスタンスをデータベースから削除するためのメソッドです。jane.destroy()を実行すると、janeというインスタンスがデータベースから削除されます。
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
await jane.destroy();
// Now this entry was removed from the database

const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
console.log(jane.favoriteColor); // "green"
jane.name = "Jane II";
jane.favoriteColor = "blue";
await jane.save({ fields: ['name'] });
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "blue"
// The above printed blue because the local object has it set to blue, but
// in the database it is still "green":
await jane.reload();
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "green"

