//PrismaClientとは、Prismaのクライアントライブラリで、Prismaの機能を呼び出すためのクラスです。
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

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

//
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

const result = await prisma.user.findUnique({
   where: {
      fullname: {
         // name property of @@unique attribute - default is firstname_lastname
         firstName: 'Alice',
         lastName: 'Smith',
      },
   },
})

//findUniqueOrThrowとは、データが見つからない場合にエラーをスローするfindUniqueメソッドです。
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

//findFirstOrThrowとは、データが見つからない場合にエラーをスローするfindFirstメソッドです。
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

//upsertとは、データが存在する場合は更新し、存在しない場合は作成するメソッドです。
prisma.User.upsert({
   where: {
      userName: 'Alice',
   },
   create: {
      id: 1,
      profileViews: 1,
      userName: 'AliceS',
      email: 'alice@prisma.io',
   },
   update: {
      email: 'updated@example.com',
   },
})

//upsertとは、データが存在する場合は更新し、存在しない場合は作成するメソッドです。
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

//deleteとは、データを削除するメソッドです。
const deleteUser = await prisma.user.delete({
   where: {
      email: 'elsa@prisma.io',
   },
   select: {
      email: true,
      name: true,
   },
})

//updateManyとは、複数のデータを更新するメソッドです。
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

//deleteManyとは、複数のデータを削除するメソッドです。
const deletedUserCount = await prisma.user.deleteMany({
   where: { name: 'Alice' },
})

//countとは、データの数を取得するメソッドです。
const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

