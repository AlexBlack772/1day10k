//PrismaClientとは、Prismaのクライアントライブラリで、Prismaの機能を呼び出すためのクラスです。
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

//
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

//rejectOnNotFoundとは、PrismaClientのオプションで、データが見つからない場合にエラーを発生させるかどうかを設定することができます。
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

//
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

//
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

//upsertとは、PrismaClientのメソッドで、データが存在する場合は更新し、存在しない場合は作成することができます。
prisma.user.upsert({
   select: {
      email: true,
      id: true,
      posts: {
         select: {
            title: true,
         },
      },
   },
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

//
const deleteUser = await prisma.user.delete({
   where: {
      email: 'elsa@prisma.io',
   },
   select: {
      email: true,
      name: true,
   },
})

//updateManyとは、PrismaClientのメソッドで、複数のデータを更新することができます。
const deleteUser = await prisma.user.updateMany({
   where: {
      email: {
         contains: 'prisma.io',
      },
      posts: {
         some: {
            likes: {
               gt: 10,
            },
         },
      },
   },
   data: {
      role: 'USER',
   },
})

//countとは、PrismaClientのメソッドで、データの数を取得することができます。
const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

//aggregateとは、PrismaClientのメソッドで、データの集計を行うことができます。
const setValue = await prisma.user.aggregate({
   _sum: {
      profileViews: true,
   },
})

//groupByとは、PrismaClientのメソッドで、データをグループ化することができます。
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

//findManyとは、PrismaClientのメソッドで、複数のデータを取得することができます。
const result = await prisma.user.findMany({
   select: {
      id: true,
      name: true,
      posts: {
         include: {
            author: true,
         },
      },
   },
})


