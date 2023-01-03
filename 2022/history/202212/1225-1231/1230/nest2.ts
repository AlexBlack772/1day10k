//nestFactoryとは、Nestアプリケーションを作成するためのファクトリー関数です。
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  await app.listen(3000);
}
bootstrap();


import { Get, Controller, Render } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Render("index")
  root() {
    return { message: "Hello world!" };
  }
}

//@Renderとは、テンプレートエンジンを使用してレスポンスをレンダリングするためのデコレーターです。
//Getとは、HTTPメソッドのGETを使用するためのデコレーターです。

import { Get, Controller, Res, Render } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render(this.appService.getViewName(), {
      message: "Hello world!",
    });
  }
}

//NestFastifyApplicationとは、Nestアプリケーションのインターフェースです。
import { NestFactory } from "@nestjs/core";
import {
  NestFastifyApplication,
  FastifyAdapter,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useStaticAssets({
    root: join(__dirname, "..", "public"),
    prefix: "/public/",
  });
  app.setViewEngine({
    engine: {
      handlebars: require("handlebars"),
    },
    templates: join(__dirname, "..", "views"),
  });
  await app.listen(3000);
}
bootstrap();

import * as compression from "compression";
// somewhere in your initialization file
app.use(compression());

import * as cookieParser from "cookie-parser";
// somewhere in your initialization file
app.use(cookieParser());

//helmetとは、Expressアプリケーションのセキュリティを強化するためのミドルウェアです。
import * as helmet from "helmet";

@Get()
findAll(@Res({ passthrough: true }) response: Response) {
  response.cookie('key', 'value')
}

import { Get, Controller, Res, Render } from "@nestjs/common";
import { Response } from "express";

//fastifyCookieとは、Fastifyアプリケーションのクッキーをサポートするためのプラグインです。
import fastifyCookie from '@fastify/cookie';

// somewhere in your initialization file
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
);
await app.register(fastifyCookie, {
  secret: 'my-secret', // for cookies signature
});

//createParamDecoratorとは、パラメータデコレーターを作成するための関数です。
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);


export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

//bootstrapとは、アプリケーションを起動するための関数です。
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

//ValidationPipeとは、入力データを検証するためのパイプです。
import { ValidationPipe } from "@nestjs/common";

//BullModuleとは、Bullを使用してジョブを処理するためのモジュールです。
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule { }

BullModule.forRoot('alternative-config', {
  redis: {
    port: 6381,
  },
});
//forRootとは、モジュールをインポートするための関数です。

import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}

//InjectQueueとは、キューを注入するためのデコレーターです。
@Injectable()
export class AudioService {
   constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}
   
//Processとは、ジョブを処理するためのデコレーターです。
import { Processor } from '@nestjs/bull';

@Processor('audio')
export class AudioConsumer { }

//Queueとは、Bullのキューを表すクラスです。
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioService {
   constructor(@InjectQueue('audio') private audioQueue:
      Queue) { }
}

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (i = 0; i < 100; i++) {
      await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }
}

//Jobとは、Bullのジョブを表すクラスです。
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
   @Process()
   async transcode(job: Job<unknown>) {
      let progress = 0;
      for (i = 0; i < 100; i++) {
         await doSomething(job.data);
         progress += 1;
         await job.progress(progress);
      }
      return {};
   }
}
   
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  
   @OnQueueCompleted()
   onCompleted(job: Job, result: unknown) {
      console.log(
         `Completed job ${job.id} of type ${job.name} with result ${result}`,
      );
   }
}

@OnGlobalQueueCompleted()
async onGlobalCompleted(jobId: number, result: any) {
  const job = await this.immediateQueue.getJob(jobId);
  console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
}

@Mutation(returns => Post)
async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  return this.postsService.upvoteById({ id: postId });
}

//mutationとは、データを変更するためのクエリです。
mutation {
   upvotePost(postId: 1) {
      id
      votes
   }
}

//
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpvotePostInput {
  @Field()
  postId: number;
}

@Mutation(returns => Post)
async upvotePost(@Args('input') input: UpvotePostInput) {
   return this.postsService.upvoteById(input);
}

@Mutation()
async upvotePost(@Args('postId') postId: number) {
  return this.postsService.upvoteById({ id: postId });
}

import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Character {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';


type Author {
  name: String!
}

type Book {
  title: String!
}

union ResultUnion = Author | Book

type Query {
  search: [ResultUnion!]!
}

import { Field, ID, ObjectType } from '@nestjs/graphql';

export const ResultUnion = createUnionType({
  name: 'ResultUnion',
  types: () => [Author, Book] as const,
  resolveType(value) {
    if (value.name) {
      return Author;
    }
    if (value.title) {
      return Book;
    }
    return null;
  },
});

@ObjectType()
export class Author {
   @Field()
   name: string;
}
   
//dtoとは、データの変換を行うためのクラスです。