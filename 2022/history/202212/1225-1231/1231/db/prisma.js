//PrismaClientとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する。
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

//prismaclientとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する。
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   log: [{ level: 'query', emit: 'event' }],
})

prisma.$on('query', (e) => {
   console.log(e)
})

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

//prismaとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する。
const prisma = new PrismaClient({
   errorFormat: 'pretty',
})

//rejectOnNotFoundとは、データが見つからなかった場合にエラーを発生させるかどうかを指定する。
const prisma = new PrismaClient({
   rejectOnNotFound: {
      findUnique: true,
      findFirst: true,
      findMany: true,
      create: true,
      update: true,
      delete: true,
   },
})

//prismaとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する。

const prisma = new PrismaClient({
   rejectOnNotFound: {
      findFirst: {
         User: (err) => new Error('User error'),
         Post: (err) => new Error('Post error!'),
      },
      findUnique: {
         User: (err) => new Error('User error'),
         Post: (err) => new Error('Post error!'),
      },
   },
})

//findUniqueとは、ユニークなフィールドを指定して、データを取得する。
const result = await prisma.user.findUnique({
   where: {
      fullname: {
         // name property of @@unique attribute - default is firstname_lastname
         firstName: 'Alice',
         lastName: 'Smith',
      },
   },
})

//$transactionとは、複数のクエリをトランザクションで実行する。
prisma.$transaction(async (tx) => {
   await tx.model.create({ data: { ... });
   await tx.model.findFirstOrThrow();
})

//
const user = await prisma.user.findMany({
   where: { name: 'Alice' },
})

//prismaとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する。
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

async function main() {
   let users: Prisma.UserCreateInput[] = [
      {
         email: 'ariana@prisma.io',
         name: 'Ari',
         profileViews: 20,
         coinflips: [true, false, false],
         role: 'ADMIN',
      },
      {
         email: 'elsa@prisma.io',
         name: 'Elsa',
         profileViews: 20,
         coinflips: [true, false, false],
         role: 'ADMIN',
      },
   ]

   await Promise.all(
      users.map(async (user) => {
         await prisma.user.create({
            data: user,
         })
      })
   )
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

//createManyとは、複数のデータを作成する。
const result = await prisma.user.createMany({
   data: [
      {
         email: '
',

         name: 'Alice',
      },
      {
         email: '
',
      }]
})

//countとは、データの数を取得する。
const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

//groupByとは、データをグループ化する。
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

const user = await prisma.user.create({
   data: {
      email: 'alice@prisma.io',
      posts: {
         create: [
            { title: 'This is my first post' },
            { title: 'Here comes a second post' },
         ],
      },
   },
   include: { posts: true }, // Returns all fields for all posts
})

//
const user = await prisma.user.create({
   data: {
      email: '
',

      posts: {
   