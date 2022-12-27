//modelとは、データベースのテーブルを表すオブジェクト
instance.field
// is the same as
instance.get('field')
// is the same as
instance.getDataValue('field')

//Sequelizeは、データベースのテーブルを表すモデルを定義するためのクラスです。
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

//datatypesとは、データベースのカラムのデータ型を表すクラスです。
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

//modelのインスタンスを作成するには、model.create()を使用します。
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

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

const jane = await User.create({ name: "Jane" });
// Jane exists in the database now!
console.log(jane instanceof User); // true
console.log(jane.name); // "Jane"

//save()とは、モデルのインスタンスをデータベースに保存するためのメソッドです。
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// the name is still "Jane" in the database
await jane.save();
// Now the name was updated to "Ada" in the database!

//reload()とは、データベースからモデルのインスタンスを再読み込みするためのメソッドです。
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// the name is still "Jane" in the database
await jane.reload();
console.log(jane.name); // "Jane"

//
const jane = await User.create({ name: "Jane", age: 100 });
const incrementResult = await jane.increment('age', { by: 2 });
// Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`

// In PostgreSQL, `incrementResult` will be the updated user, unless the option
// `{ returning: false }` was set (and then it will be undefined).

// In other dialects, `incrementResult` will 

//// Create a new user
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);

//select()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
Model.findAll({
   attributes: ['foo', 'bar']
});

//findAll()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
// This is a tiresome way of getting the number of hats (along with every column)
Model.findAll({
   attributes: [
      'id', 'foo', 'bar', 'baz', 'qux', 'hats', // We had to list all attributes...
      [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'] // To add the aggregation...
   ]
});

// This is shorter, and less error prone because it still works if you add / remove attributes from your model later
Model.findAll({
   attributes: {
      include: [
         [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
      ]
   }
});

//modelのインスタンスを削除するには、model.destroy()を使用します。   
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

//findAll()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
Model.findAll({
attributes: { exclude: ['baz'] }
});


//findAll()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
Post.findAll({
   where: {
      authorId: 12,
      status: 'active'
   }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';

const { Op } = require("sequelize");
Post.findAll({
   where: {
      [Op.and]: [
         { authorId: 12 },
         { status: 'active' }
      ]
   }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';

//findByPk()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
const project = await Project.findByPk(123);
if (project === null) {
   console.log('Not found!');
} else {
   console.log(project instanceof Project); // true
   // Its primary key is 123
}

//findOne()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
   console.log('Not found!');
} else {
   console.log(project instanceof Project); // true
   console.log(project.title); // 'My Title'
}

//findOrCreate()とは、データベースからモデルのインスタンスを検索するためのメソッドです。
const [user, created] = await User.findOrCreate({
   where: { username: 'sdepold' },
   defaults: {
      job: 'Technical Lead JavaScript'
   }
});
console.log(user.username); // 'sdepold'
console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
console.log(created); // The boolean indicating whether this instance was just created
if (created) {
   console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
}

//get()とは、モデルのインスタンスの値を取得するためのメソッドです。
const User = sequelize.define('user', {
   // Let's say we wanted to see every username in uppercase, even
   // though they are not necessarily uppercase in the database itself
   username: {
      type: DataTypes.STRING,
      get() {
         const rawValue = this.getDataValue('username');
         return rawValue ? rawValue.toUpperCase() : null;
      }
   }
});

//
const User = sequelize.define('user', {
username: DataTypes.STRING,
   password: {
   type: DataTypes.STRING,
      set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('password', hash(value));
   }
}
});

//sequelize.define()とは、モデルを定義するためのメソッドです。
sequelize.define('foo', {
   bar: {
      type: DataTypes.STRING,
      validate: {
         is: /^[a-z]+$/i,          // matches this RegExp
         is: ["^[a-z]+$", 'i'],     // same as above, but constructing the RegExp from a string
         not: /^[a-z]+$/i,         // does not match this RegExp
         not: ["^[a-z]+$", 'i'],    // same as above, but constructing the RegExp from a string
         isEmail: true,            // checks for email format (foo@bar.com)
         isUrl: true,              // checks for url format (https://foo.com)
         isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
         isIPv4: true,             // checks for IPv4 (129.89.23.1)
         isIPv6: true,             // checks for IPv6 format
         isAlpha: true,            // will only allow letters
         isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
         isNumeric: true,          // will only allow numbers
         isInt: true,              // checks for valid integers
         isFloat: true,            // checks for valid floating point numbers
         isDecimal: true,          // checks for any numbers
         isLowercase: true,        // checks for lowercase
         isUppercase: true,        // checks for uppercase
         notNull: true,            // won't allow null
         isNull: true,             // only allows null
         notEmpty: true,           // don't allow empty strings
         equals: 'specific value', // only allow a specific value
         contains: 'foo',          // force specific substrings
         notIn: [['foo', 'bar']],  // check the value is not one of these
         isIn: [['foo', 'bar']],   // check the value is one of these
         notContains: 'bar',       // don't allow specific substrings
         len: [2, 10],              // only allow values with length between 2 and 10
         isUUID: 4,                // only allow uuids
         isDate: true,             // only allow date strings
         isAfter: "2011-11-05",    // only allow date strings after a specific date
         isBefore: "2011-11-05",   // only allow date strings before a specific date
         max: 23,                  // only allow values <= 23
         min: 23,                  // only allow values >= 23
         isCreditCard: true,       // check for valid credit card numbers

         // Examples of custom validators:
         isEven(value) {
            if (parseInt(value) % 2 !== 0) {
               throw new Error('Only even values are allowed!');
            }
         }
      isGreaterThanOtherField(value) {
            if (parseInt(value) <= parseInt(this.otherField)) {
               throw new Error('Bar must be greater than otherField.');
            }
         }
      }
   }
});


//
class User extends Model { }
User.init({
   username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
         len: [5, 10]
      }
   }
}, { sequelize });

