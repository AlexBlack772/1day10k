//prismaClientとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

//PrismaClientとは、Prismaのクライアントライブラリで、Prismaのクエリを実行するためのメソッドを提供する
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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   log: [
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
   ],
})

prisma.$on('warn', (e) => {
   console.log(e)
})

prisma.$on('info', (e) => {
   console.log(e)
})

prisma.$on('error', (e) => {
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

//rejectOnNotFoundとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
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

//findUniqueOrThrowとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
   const a = await prisma.post.create({
      data: {
         title: 'A test 1',
      },
   })

   const b = await prisma.post.create({
      data: {
         title: 'A test 2',
      },
   })

   const c = await prisma.post.findFirst({
      where: {
         title: {
            startsWith: 'A test',
         },
      },
      orderBy: {
         title: 'asc',
      },
      take: -1, // Reverse the list
   })
}

main()

//findFirstOrThrowとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
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

//upsertとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
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

//createManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.createMany({
   data: [
      { name: 'Sonali', email: 'sonali@prisma.io' },
      { name: 'Alex', email: 'alex@prisma.io' },
   ],
})

//updateManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.updateMany({
   where: {
      name: 'Sonali',
   },
   data: {
      email: '
   },
})

//deleteManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.deleteMany({
   where: {
      name: 'Sonali',
   },
})

//findManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.findMany({
   where: {
      name: 'Sonali',
   },
})

//findUniqueとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.findUnique({
   where: {
      name: 'Sonali',
   },
})

//findFirstとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.findFirst({
   where: {
      name: 'Sonali',
   },
})

//updateManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const updatedUserCount = await prisma.user.updateMany({
   where: { name: 'Alice' },
   data: { name: 'ALICE' },
})

//deleteManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const deletedUserCount = await prisma.user.deleteMany({
   where: { name: 'Alice' },
})

//findManyとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const users = await prisma.user.findMany({
   where: { name: 'Alice' },
})

//findUniqueとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する   
const user = await prisma.user.findUnique({
   where: { name: 'Alice' },
})

//findFirstとは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const c = await prisma.user.count({
   select: {
      _all: true,
      city: true,
      name: true,
   },
})

//groupBy()とは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
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

//select()とは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const result = await prisma.user.findUnique({
   where: { id: 1 },
   select: {
      name: true,
      profileViews: true,
   },
})

//include()とは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const result = await prisma.user.findUnique({
   where: { id: 1 },
   include: {
      posts: true,
   },
})

const users = await prisma.user.findMany({
   include: {
      posts: true, // Returns all fields for all posts
      profile: true, // Returns all Profile fields
   },
})

//where()とは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const results = await prisma.user.findMany({
   where: {
      email: {
         endsWith: 'prisma.io',
      },
   },
})

//orderBy()とは、Prismaのクエリで、データが見つからなかった場合にエラーを発生させるかどうかを指定する
const results = await prisma.user.findMany({
   orderBy: {
      email: 'asc',
   },
})

