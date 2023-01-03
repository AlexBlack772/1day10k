//PrismaClientとは、Prismaのクライアントライブラリで、PrismaのデータベースにアクセスするためのAPIを提供する。
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: 'file:./dev_qa.db',
      },
   },
})

//@disconnectは、PrismaClientのインスタンスを破棄するためのメソッド。
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

//errorFormatとは、エラーのフォーマットを指定するためのプロパティ。
const prisma = new PrismaClient({
   errorFormat: 'pretty',
})

//rejectOnNotFoundとは、データが見つからない場合にエラーを発生させるかどうかを指定するためのプロパティ。
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

//whereとは、検索条件を指定するためのプロパティ。
const result = await prisma.user.findUnique({
   where: {
      id: 42,
   },
})

//selectとは、取得するカラムを指定するためのプロパティ。
const result = await prisma.user.findUnique({
   where: {
      id: 42,
   },
   select: {
      id: true,
      name: true,
   },
})

//includeとは、関連するデータを取得するためのプロパティ。
const result = await prisma.user.findUnique({
   where: {
      id: 42,
   },
   include: {
      posts: true,
   },
})

//orderByとは、ソート順を指定するためのプロパティ。
const result = await prisma.user.findMany({
   orderBy: {
      name: 'asc',
   },
})

//skipとは、取得するデータの開始位置を指定するためのプロパティ。
const result = await prisma.user.findMany({
   skip: 10,
})

//takeとは、取得するデータの件数を指定するためのプロパティ。
const result = await prisma.user.findMany({
   take: 10,
})

//cursorとは、ページネーションのためのカーソルを指定するためのプロパティ。
const result = await prisma.user.findMany({
   cursor: {
      id: 42,
   },
})

//distinctとは、重複したデータを除外するためのプロパティ。
const result = await prisma.user.findMany({
   distinct: ['name'],
})

//countとは、データの件数を取得するためのプロパティ。
const result = await prisma.user.findMany({
   count: true,
})

//createとは、データを作成するためのプロパティ。
const result = await prisma.user.create({
   data: {
      name: 'Alice',
   },
})

//updateとは、データを更新するためのプロパティ。
const result = await prisma.user.update({
   where: {
      id: 42,
   },
   data: {
      name: 'Alice',
   },
})

//deleteとは、データを削除するためのプロパティ。
const result = await prisma.user.delete({
   where: {
      id: 42,
   },
})

//upsertとは、データが存在する場合は更新し、存在しない場合は作成するためのプロパティ。
const result = await prisma.user.upsert({
   where: {
      id: 42,
   },
   create: {
      name: 'Alice',
   },
   update: {
      name: 'Alice',
   },
})

//connectとは、既存のデータを関連付けるためのプロパティ。
const result = await prisma.user.update({
   where: {
      id: 42,
   },
   data: {
      posts: {
         connect: {
            id: 1,
         },
      },
   },
})

//disconnectとは、既存のデータの関連付けを解除するためのプロパティ。
const result = await prisma.user.update({
   where: {
      id: 42,
   },
   data: {
      posts: {
         disconnect: {
            id: 1,
         },
      },
   },
})

//setとは、既存のデータの関連付けを解除し、新たに関連付けるためのプロパティ。
const result = await prisma.user.update({
   where: {
      id: 42,
   },
   data: {
      posts: {
         set: {
            id: 1,
         },
      },
   },
})

//findUniqueOrThrowとは、データが見つからない場合にエラーを発生させるためのプロパティ。
const result = await prisma.user.findUniqueOrThrow({
   where: {
      id: 42,
   },
})

//findFirstとは、データを1件取得するためのプロパティ。
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

//findManyとは、データを複数件取得するためのプロパティ。
const user = await prisma.user.findMany({
   where: { name: 'Alice' },
})

//createとは、データを作成するためのプロパティ。
const user = await prisma.user.create({
data: { email: 'alice@prisma.io' },
})


//prismaとは、データベースとのやりとりを行うためのプロパティ。
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

//upsertとは、データが存在する場合は更新し、存在しない場合は作成するためのプロパティ。
const user = await prisma.user.upsert({
where: { id: 1 },
update: { email: 'alice@prisma.io' },
create: { email: 'alice@prisma.io' },
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

//deleteとは、データを削除するためのプロパティ。
const user = await prisma.user.delete({
   where: { id: 1 },
})

//deleteManyとは、データを複数件削除するためのプロパティ。
const deleteUser = await prisma.user.delete({
   where: {
      email: 'elsa@prisma.io',
   },
   select: {
      email: true,
      name: true,
   },
})

//updateManyとは、データを複数件更新するためのプロパティ。
const updateMany = await prisma.user.updateMany({
   where: {
      email: {
         contains: 'prisma.io',
      },
   },
   data: {
      profileViews: {
         increment: 1,
      },
   },
})

export type BatchPayload = {
   count: number
}

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

//countとは、データの件数を取得するためのプロパティ。
const result = await prisma.user.count({
   where: {
      post: {
         some: {
            published: true,
         },
      },
   },
})

//aggregateとは、データの集計を行うためのプロパティ。
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

//groupByとは、データをグループ化するためのプロパティ。
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



