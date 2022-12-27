//await coll.findOne({ title: 'Hamlet' })とは、
//coll.findOne({ title: 'Hamlet' })の結果をawaitで待つという意味
const hamlet = await coll.findOne({ title: 'Hamlet' })

//collとは、MongoDBのコレクションを指す
//coll.updateOne()は、MongoDBのコレクションの1つのドキュメントを更新する
//findOne()で取得したドキュメントの_idを指定して、
//updateOne()でドキュメントを更新する

//find()で取得したドキュメントの_idを指定して、
coll.find({ year: 2005 });

//coll.insert()は、MongoDBのコレクションにドキュメントを挿入する
await coll.insert({ title: 'Jackie Robinson' });

//coll.insertMany()とは、MongoDBのコレクションに複数のドキュメントを挿入する
await coll.insertMany([
   { title: 'Dangal', rating: 'Not Rated' },
   { title: 'The Boss Baby', rating: 'PG' }
]);

//coll.updateOne()とは、MongoDBのコレクションの1つのドキュメントを更新する
await coll.updateOne(
   { title: 'Amadeus' },
   { $set: { 'imdb.rating': 9.5 } }
);

//coll.updateMany()とは、MongoDBのコレクションの複数のドキュメントを更新する
await coll.updateOne(
   { title: 'Amadeus' },
   { $set: { 'imdb.rating': 9.5 } }
);

//coll.updateOne()とは、MongoDBのコレクションの1つのドキュメントを更新する
await coll.updateOne(
{ title: 'Amadeus' },
{ $set: { 'imdb.rating': 9.5 } }
);

//coll.deleteOne()とは、MongoDBのコレクションの1つのドキュメントを削除する
await coll.deleteOne({ title: 'Congo' });

//coll.deleteMany()とは、MongoDBのコレクションの複数のドキュメントを削除する
await coll.deleteMany({ title: { $regex: /^Shark.*/ } });

//coll.bulkWrite()とは、MongoDBのコレクションに複数のドキュメントを挿入、更新、削除する
await coll.bulkWrite([
   {
      insertOne: {
         document: {
            title: 'A New Movie',
            year: 2022
         }
      }
   },
   {
      deleteMany: {
         filter: { year: { $lt: 1970 } }
      }
   }
]);

//coll.watch()とは、MongoDBのコレクションの変更を監視する
coll.watch([{ $match: { year: { $gte: 2022 } } }]);

//cursor.forEach()とは、MongoDBのカーソルの各ドキュメントに対して、
const cursor = coll.find();
await cursor.forEach(console.dir);

//coll.countDocuments()とは、MongoDBのコレクションのドキュメント数を取得する
await coll.countDocuments({ year: 2000 });

//coll.distinct()とは、MongoDBのコレクションのドキュメントの中の特定のフィールドの値を取得する
await coll.distinct('year');

//coll.find()とは、MongoDBのコレクションのドキュメントを取得する
await coll.find({ year: 2000 });

//collection.find()とは、MongoDBのコレクションのドキュメントを取得する
collection.find({ title: { $regex: /^Rocky/ } }, { skip: 2 });

//coll.find()とは、MongoDBのコレクションのドキュメントを取得する
coll.find().project({ _id: 0, year: 1, imdb: 1 });

//await coll.createIndex({ title: 1, year: -1 });
await coll.createIndex({ title: 1, year: -1 });


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

//prismaclientとは、Prismaのクライアントを指す

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

async function main() {
   const countUsers = await prisma.user.count({})
}

main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })

const prisma = new PrismaClient({
   errorFormat: 'pretty',
})

//prisma.user.findUnique()とは、Prismaのユーザーのユニークな値を取得する
const result = await prisma.user.findUnique({
   where: {
      id: 42,
   },
})


const user = await prisma.user.findFirst({
   where: { name: 'Alice' },
})

//prisma.user.findFirst()とは、Prismaのユーザーの最初の値を取得する

//findUniqueOrThrow()とは、Prismaのユーザーのユニークな値を取得する
const user = await prisma.user.findUniqueOrThrow({
   where: { id: 42 },
})


//findMany()とは、Prismaのユーザーの複数の値を取得する
const users = await prisma.user.findMany({
   where: { name: 'Alice' },
})

//create()とは、Prismaのユーザーを作成する
const user = await prisma.user.create({
   data: {
      name: 'Alice',
   },
})

//update()とは、Prismaのユーザーを更新する
const user = await prisma.user.update({
   where: { id: 42 },
   data: { name: 'Alice' },
})

//delete()とは、Prismaのユーザーを削除する
const user = await prisma.user.delete({
   where: { id: 42 },
})

//upsert()とは、Prismaのユーザーを作成または更新する
const user = await prisma.user.upsert({
   where: { id: 42 },
   create: { name: 'Alice' },
   update: { name: 'Alice' },
})

const user = await prisma.user.upsert({
   where: { id: 1 },
   update: { email: 'alice@prisma.io' },
   create: { email: 'alice@prisma.io' },
})

prisma.user.upsert({
   where: {
      userName: 'Alice',
   },
   create: {
      id: 1,
      profileViews: 1,
      userName: 'Alice',
      email: 'alice@prisma.io',
   },
   update: {
      email: 'updated@example.com',
   },
})

prisma.User.upsert({
   where: {
      userName: 'Alice',
      profileViews: 1,
      id: 1,
   },
   create: {
      id: 1,
      profileViews: 1,
      userName: 'Alice',
      email: 'alice@prisma.io',
   },
   update: {
      email: 'updated@example.com',
   },
})

//delete()とは、Prismaのユーザーを削除する
const user = await prisma.user.delete({
   where: { id: 1 },
})

const deleteUser = await prisma.user.delete({
   where: {
      email: 'elsa@prisma.io',
   },
   select: {
      email: true,
      name: true,
   },
})

//createMany()とは、Prismaのユーザーを複数作成する
const users = await prisma.user.createMany({
   data: [
      { name: 'Sonali', email: 'sonali@prisma.io' },
      { name: 'Alex', email: 'alex@prisma.io' },
   ],
})

//updateMany()とは、Prismaのユーザーを複数更新する
const users = await prisma.user.updateMany({
   where: {
      email: {
         ends
         with: 'prisma.io',
      },
   },
   data: {
      email: {
         set: '

',

      },
   },
})

//deleteMany()とは、Prismaのユーザーを複数削除する
const deletedUserCount = await prisma.user.deleteMany({
   where: { name: 'Alice' },
})

//count()とは、Prismaのユーザーの数を取得する
const count = await prisma.user.count({
   where: { name: 'Alice' },
})

const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

//aggregate()とは、Prismaのユーザーの集計を取得する
const minMaxAge = await prisma.user.aggregate({
   _count: {
      _all: true,
   },
   _max: {
      profileViews: true,
   },
   _min: {
      profileViews: true,
   },
})

//groupBy()とは、Prismaのユーザーをグループ化する
const groupBy = await prisma.user.groupBy({
   by: ['name'],
   _count: {
      _all: true,
   },
   _max: {
      profileViews: true,
   },
   _min: {
      profileViews: true,
   },
})

const groupUsers = await prisma.user.groupBy({
   by: ['country', 'city'],
   _count: {
      _all: true,
      city: true,
   },
   _sum: {
      profileViews: true,
   },
   orderBy: {
      country: 'desc',
   },
   having: {
      profileViews: {
         _avg: {
            gt: 200,
         },
      },
   },
})

//select()とは、Prismaのユーザーの値を取得する
const user = await prisma.user.findUnique({
   where: { id: 42 },
   select: {
      name: true,
      email: true,
   },
})

//include()とは、Prismaのユーザーの関連する値を取得する
const user = await prisma.user.findUnique({
   where: { id: 42 },
   include: {
      posts: true,
   },
})

//where()とは、Prismaのユーザーの条件を指定する
const user = await prisma.user.findMany({
   where: {
      name: 'Alice',
      email: {
         ends
         with: 'prisma.io',
      },
   },
})

const results = await prisma.user.findMany({
   where: {
      email: {
         endsWith: 'prisma.io',
      },
   },
})

//UserWhereInputとは、Prismaのユーザーの条件を指定する
const results = await prisma.user.findMany({
   where: {
      email: {
         ends
         with: 'prisma.io',
      },
   },
})

// UserWhereInput
const whereNameIs = Prisma.validator < Prisma.UserWhereInput > ()({
   name: 'Rich',
})

// It can be combined with conditional operators too
const whereNameIs = Prisma.validator < Prisma.UserWhereInput > ()({
   name: 'Rich',
   AND: [
      {
         email: {
            contains: 'rich@boop.com',
         },
      },
   ],
})

//orderBy()とは、Prismaのユーザーの並び順を指定する
const users = await prisma.user.findMany({
   orderBy: {
      name: 'asc',
   },
})

//post()とは、Prismaのユーザーの投稿を取得する
const posts = await prisma.post.findMany({
   orderBy: {
      _relevance: {
         fields: ['title'],
         search: 'database',
         sort: 'asc'
      },
   })
})


const users3 = await prisma.user.findMany({
   orderBy: {
      email: 'asc',
   },
   select: {
      name: true,
      email: true,
   },
})


const userWithPosts = await prisma.user.findUnique({
   where: {
      id: 1,
   },
   include: {
      posts: {
         orderBy: {
            title: 'desc',
         },
         select: {
            title: true,
            published: true,
         },
      },
   },
})

//distinct()とは、Prismaのユーザーの重複を取り除く
const distinctUsers = await prisma.user.findMany({
   distinct: ['name'],
})

const distinctCities = await prisma.user.findMany({
   select: {
      city: true,
      country: true,
   },
   distinct: ['city'],
})

//create()とは、Prismaの投稿を作成する

const post = await prisma.post.create({
   data: {
      title: 'Join us for Prisma Day 2020 in Berlin',

   }
})

//createMany()とは、Prismaの投稿を複数作成する
const posts = await prisma.post.createMany({
   data: [
      {
         title: 'Join us for Prisma Day 2020 in Berlin',
      }
   ],
})

const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         createMany: {
            data: [{ title: 'My first post' }, { title: 'My second post' }],
         },
      },
   },
})

//set()とは、Prismaの投稿を更新する
const post = await prisma.post.update({
   where: {
      id: 1,
   },
   data: {
      published: true,
   },
})

//update()とは、Prismaの投稿を更新する
const post = await prisma.post.update({
   where: {
      id: 1,
   },
   data: {
      published: true,
   },
})

const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      posts: {
         set: [{ id: 32 }, { id: 42 }],
      },
   },
})

//connectOrCreate()とは、Prismaの投稿を作成または接続する
const post = await prisma.post.update({
   where: {
      id: 1,
   },
   data: {
      published: true,
   },
})

const createPost = await prisma.post.create({
   data: {
      title: 'How to create a compiler',
      content: '...',
      author: {
         connect: {
            id: 9,
         },
      },
      tags: {
         connectOrCreate: {
            create: {
               name: 'computing',
            },
            where: {
               name: 'computing',
            },
         },
      },
   },
})

const user = await prisma.profile.create({
   data: {
      bio: 'The coolest Alice on the planet',
      user: {
         connectOrCreate: {
            where: { email: 'alice@prisma.io' },
            create: { email: 'alice@prisma.io' }
         },
      },
   })

const updateUser = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      profile: {
         connectOrCreate: {
            where: { id: 20 },
            create: {
               bio: 'The coolest Alice in town',
            },
         },
      },
   },
})

const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      posts: {
         connectOrCreate: [
            {
               where: { id: 32 },
               create: { title: 'This is my first post' },
            },
            {
               where: { id: 19 },
               create: { title: 'This is my second post' },
            },
         ],
      },
   },
})

//disconnect()とは、Prismaの投稿を切断する
const user = await prisma.user.update({
   where: { email: 'bob@prisma.io' },
   data: {
      profile: {
         disconnect: true,
      },
   },
})

//update()とは、Prismaの投稿を更新する
const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      profile: {
         update: { bio: 'Hello World' },
      },
   },
})

//upsert()とは、Prismaの投稿を作成または更新する
const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      profile: {
         upsert: {
            create: { bio: 'Hello World' },
            update: { bio: 'Hello World' },
         },
      },
   },
})

//delete()とは、Prismaの投稿を削除する
const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      profile: {
         delete: true,
      },
   },
})
const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      posts: {
         delete: [{ id: 34 }, { id: 36 }],
      },
   },
})

//updateMany()とは、Prismaの投稿を複数更新する
const result = await prisma.user.update({
   where: {
      id: 2,
   },
   data: {
      posts: {
         updateMany: {
            where: {
               published: false,
            },
            data: {
               likes: 0,
            },
         },
      },
   },
})

//deleteMany()とは、Prismaの投稿を複数削除する
const result = await prisma.user.update({
   where: {
      id: 2,
   },
   data: {
      name: 'Updated name',
      posts: {
         deleteMany: {},
      },
   },
})

const user = await prisma.user.update({
   where: { email: 'alice@prisma.io' },
   data: {
      profile: {
         upsert: {
            create: { bio: 'Hello World' },
            update: { bio: 'Hello World' },
         },
      },
   },
})

//equals()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      title: {
         equals: 'Join us for Prisma Day 2020 in Berlin',
      },
   },
})

const result = await prisma.user.findMany({
   where: {
      name: {
         equals: 'Eleanor',
      },
   },
})

//not()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      title: {
         not: 'Join us for Prisma Day 2020 in Berlin',
      },
   },
})

//in()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      title: {
         in: [
            'Join us for Prisma Day 2020 in Berlin',
            'Subscribe to GraphQL Weekly for community news',
         ],
      },
   },
})

//notIn()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      title: {
         notIn: [
            'Join us for Prisma Day 2020 in Berlin',
            'Subscribe to GraphQL Weekly for community news',
         ],
      },
   },
})

//lt()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      likes: {
         lt: 100,
      },
   },
})

//lte()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      likes: {
         lte: 100,
      },
   },
})

//gt()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      likes: {
         gt: 100,
      },
   },
})

//gte()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      likes: {
         gte: 100,
      },
   },
})

//containsとは、prismaの含む投稿を検索する
const posts = await prisma.post.findMany({
   where: {
      title: {
         contains: 'Berlin',
      },
   },
})

//search()とは、Prismaの投稿を検索する
const posts = await prisma.post.findMany({
   where: {
      title: {
         search: 'Berlin',
      },
   },
})

//modeとは、
const result = await prisma.post.findMany({
   where: {
      title: {
         contains: 'prisma',
         mode: 'insensitive',
      },
   },
})

//startsWith()とは、Prismaの投稿を検索する
const result = await prisma.post.findMany({
   where: {
      title: {
         startsWith: 'Pr',
      },
   },
})

//endsWith()とは、Prismaの投稿を検索する
const result = await prisma.post.findMany({
   where: {
      title: {
         endsWith: 'Berlin',
      },
   },
})

//and()とは、Prismaの投稿を比較する
const posts = await prisma.post.findMany({
   where: {
      AND: [
         {
            title: {
               contains: 'Berlin',
            },
         },
         {
            likes: {
               gt: 100,
            },
         },
      ],
   },
})

//or()とは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      OR: [
         {
            title: {
               contains: 'Prisma',
            },
         },
         {
            title: {
               contains: 'databases',
            },
         },
      ],
   },
})

const result = await prisma.post.findMany({
   where: {
      OR: [
         {
            title: {
               contains: 'Prisma',
            },
         },
         {
            title: {
               contains: 'databases',
            },
         },
      ],
      NOT: {
         title: {
            contains: 'SQL',
         },
      },
   },
})

//not()とは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      OR: [
         {
            title: {
               contains: 'Prisma',
            },
         },
         {
            title: {
               contains: 'databases',
            },
         },
      ],
      NOT: {
         title: {
            contains: 'SQL',
         },
      },
   },
})

//some()とは、Prismaの投稿を比較する
const result = await prisma.user.findMany({
   where: {
      post: {
         every: {
            published: true
         },
         some: {
            content: {
               contains: "Prisma"
            }
         }
      }
   }
}

//every()とは、Prismaの投稿を比較する
const result = await prisma.user.findMany({
   where: {
      post: {
         every: {
            published: true
         },
         some: {
            content: {
               contains: "Prisma"
            }
         }
      }
   }
}

//none()とは、Prismaの投稿を比較する
const result = await prisma.user.findMany({
   where: {
      post: {
         every: {
            published: true
         },
         none: {
            content: {
               contains: "Prisma"
            }
         }
      }
   }
}

//isとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      user: {
         is: {
            name: "Bob"
         },
      }
   }
}

//isNotとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      user: {
         isNot: {
            name: "Bob"
         },
      }
   }
}

//setとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      user: {
         set: {
            name: "Bob"
         },
      }
   }
}

const setTags = await prisma.post.update({
   where: {
      id: 9
   },
   data: {
      tags: {
         set: ["computing", "books"]
      }
   }
})

//pushとは、Prismaの投稿を挿入する
const addTag = await prisma.post.update({
   where: {
      id: 9,
   },
   data: {
      tags: {
         push: 'computing',
      },
   },
})

//popとは、Prismaの投稿を削除する
const removeTag = await prisma.post.update({
   where: {
      id: 9,
   },
   data: {
      tags: {
         pop: 1,
      },
   },
})

//unsetとは、Prismaの投稿を削除する
const removeTag = await prisma.post.update({
   where: {
      id: 9,
   },
   data: {
      tags: {
         unset: 1,
      },
   },
})

//hasとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         has: "databases"
      }
   }
})

//hasEveryとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         hasEvery: ["databases", "computing"]
      }
   }
})

//hasSomeとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         hasSome: ["databases", "computing"]
      }
   }
})

const result = await prisma.post.findMany({
   where: {
      tags: {
         hasSome: ["databases", "computing"]
      }
   }
})

//isEmptyとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         isEmpty: true
      }
   }
})

//isSetとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         isSet: true
      }
   }
})

//qualsとは、Prismaの投稿を比較する
const result = await prisma.post.findMany({
   where: {
      tags: {
         equals: ["databases", "computing"]

      }
   }
})

//prismaClientのインスタンスを作成する
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

//
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

async function main() {
   const countUsers = await prisma.user.count({})
}

main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })
//errorFormatとは、Prismaのエラーをフォーマットする
const prisma = new PrismaClient({
   errorFormat: 'pretty',
})

//logとは、Prismaのクエリをログに出力する
const prisma = new PrismaClient({
   log: ['query', 'info', 'warn'],
})

//rejectOnNotFoundとは、Prismaのエラーをフォーマットする
const prisma = new PrismaClient({
   rejectOnNotFound: true,
})

//findUniqueOrThrow()とは、prismaの単一なエンティティを取得する
const user = await prisma.user.findUniqueOrThrow({
   where: {
      id: 1,
   },
})

//update()とは、prismaの単一なエンティティを更新する
const user = await prisma.user.update({
   where: {
      id: 1,
   },
   data: {
      name: 'Alice',
   },
})

const user = await prisma.user.update({
   where: { id: 1 },
   data: { email: 'alice@prisma.io' },
})

//upsert()とは、prismaの単一なエンティティを更新する
const user = await prisma.user.upsert({
   where: { id: 1 },
   update: { email: '
   create: { email: '
      })

//delete()とは、prismaの単一なエンティティを削除する
const user = await prisma.user.delete({
   where: {
      id: 1,
   },
})

//createMany()とは、prismaの複数のエンティティを作成する
const users = await prisma.user.createMany({
   data: [
      { name: 'Sonali', email: 'sonali@prisma.io' },
      { name: 'Alex', email: 'alex@prisma.io' },
   ],
})

//updateMany()とは、prismaの複数のエンティティを更新する
const users = await prisma.user.updateMany({
   where: {
      name: {
         contains: 'a',
      },
   },
   data: {
      email: '
   },
})

//count()とは、prismaの複数のエンティティを数える
const users = await prisma.user.count({
   where: {
      name: {
         contains: 'a',
      },
   },
})

const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

//aggregate()とは、prismaの複数のエンティティを集計する
const minMaxAge = await prisma.user.aggregate({
   _count: {
      _all: true,
   },
   _max: {
      profileViews: true,
   },
   _min: {
      profileViews: true,
   },
})

//groupBy()とは、prismaの複数のエンティティをグループ化する
const result = await prisma.user.groupBy({
   by: ['name'],
   _count: {
      _all: true,
   },
   _max: {
      profileViews: true,
   },
   _min: {
      profileViews: true,
   },
})

//select()とは、prismaの複数のエンティティを選択する
const result = await prisma.user.findMany({
   select: {
      name: true,
      email: true,
   },
})

//include()とは、prismaの複数のエンティティを含む
const result = await prisma.user.findMany({
   include: {
      posts: true,
   },
})

//orderBy()とは、prismaの複数のエンティティを並べ替える
const result = await prisma.user.findMany({
   orderBy: {
      name: 'asc',
   },
})

//cursor()とは、prismaの複数のエンティティをカーソルで取得する
const result = await prisma.user.findMany({
   cursor: {
      id: 1,
   },
})

//where()とは、prismaの複数のエンティティを条件で取得する
const results = await prisma.user.findMany({
   where: {
      email: {
         endsWith: 'prisma.io',
      },
   },
})

//orderBy()とは、prismaの複数のエンティティを並べ替える
const results = await prisma.user.findMany({
   orderBy: {
      name: 'asc',
   },
})

//take()とは、prismaの複数のエンティティを取得する

//distinct()とは、prismaの複数のエンティティを重複なしで取得する
const results = await prisma.user.findMany({
   distinct: ['name'],
})

//skip()とは、prismaの複数のエンティティをスキップして取得する
const results = await prisma.user.findMany({
   skip: 10,
})

//create()とは、prismaの単一なエンティティを作成する
const user = await prisma.user.create({
   data: {
      name: 'Alice',
      email: '
   },
})

//createMany()とは、prismaの複数のエンティティを作成する
const users = await prisma.user.createMany({
   data: [
      { name: 'Sonali', email: '
      { name: 'Alex', email: '
   ],
})

const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         createMany: {
            data: [{ title: 'My first post' }, { title: 'My second post' }],
         },
      },
   },
})

//set()とは、prismaの単一なエンティティを設定する
const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         set: [{ id: 1 }, { id: 2 }],
      },
   },
})


//connect()とは、prismaの単一なエンティティを接続する
const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         connect: [{ id: 1 }, { id: 2 }],
      },
   },
})

const user = await prisma.profile.create({
   data: {
      bio: 'Hello World',
      user: {
         connect: { email: 'alice@prisma.io' },
      },
   },
})

//connectOrCreate()とは、prismaの単一なエンティティを接続する
const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         connectOrCreate: [
            {
               where: {
                  id: 1,
               },
               create: {
                  title: 'My first post',
               },
            },
            {
               where: {
                  id: 2,
               },
               create: {
                  title: 'My second post',
               },
            },

         ],
      },
   },
})

//disconnect()とは、prismaの単一なエンティティを切断する
const user = await prisma.user.update({
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         disconnect: [{ id: 1 }, { id: 2 }],
      },
   },
})

//update()とは、prismaの単一なエンティティを更新する
const user = await prisma.user.update({   
   where: {
      id: 9,
   },
   data: {
      name: 'Elliott',
      posts: {
         update: [
            {
               where: {
                  id: 1,
               },
               data: {
                  title: 'My first post',
               },
            },
            {
               where: {
                  id: 2,
               },
               data: {
                  title: 'My second post',
               },
            },
         ],
      },
   },
})

//errFormat()とは、prismaのエラーをフォーマットする
const prisma = new PrismaClient({
   // Defaults to colorless
})