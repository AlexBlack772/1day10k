//
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

import { Exclude } from "class-transformer";

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

//CacheModuleとは、NestJSのキャッシュ機能を提供するモジュールです。
import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
})
export class AppModule {}

// APP_INTERCEPTORとは、NestJSのインターセプターを提供するプロバイダーです。
import { CacheModule, Module, CacheInterceptor } from "@nestjs/common";
import { AppController } from "./app.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

//ClientOptsとは、Redisのクライアントオプションを提供するインターフェースです。
import type { ClientOpts } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,

      // Store-specific configuration:
      host: "localhost",
      port: 6379,
    }),
  ],
  controllers: [AppController],
})
export class AppModule { }

//app.module.tsJS
//ScheduleModuleとは、NestJSのスケジュールモジュールを提供するモジュールです。
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
})
export class AppModule { }

//Cronとは、NestJSのスケジュールモジュールを提供するデコレーターです。
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron("45 * * * * *")
  handleCron() {
    this.logger.debug("Called when the current second is 45");
  }
}

//Loggerとは、NestJSのロガーを提供するクラスです。
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug("Called every 30 seconds");
  }
}

//CronExpressionとは、NestJSのスケジュールモジュールを提供するデコレーターです。
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class NotificationService {
  @Cron("* * 0 * * *", {
    name: "notifications",
    timeZone: "Europe/Paris",
  })
  triggerNotifications() {}
}

//BullModuleとは、NestJSのBullモジュールを提供するモジュールです。
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
  ],
})
export class AppModule { }

//Queueとは、NestJSのBullモジュールを提供するクラスです。
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class AudioService {
  constructor(@InjectQueue("audio") private audioQueue: Queue) {}
}

//Processorとは、NestJSのBullモジュールを提供するデコレーターです。
import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

@Processor("audio")
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

//forRootAsyncとは、NestJSのBullモジュールを提供するメソッドです。
BullModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get("QUEUE_HOST"),
      port: +configService.get("QUEUE_PORT"),
    },
  }),
  inject: [ConfigService],
});

//ArgumentMetadataとは、NestJSのパイプを提供するインターフェースです。
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}

//ExecutionContextとは、NestJSのガードを提供するインターフェースです。
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

type Subjects = InferSubjects<typeof Article | typeof User> | "all";

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, "all"); // read-write access to everything
    } else {
      can(Action.Read, "all"); // read-only access to everything
    }

    can(Action.Update, Article, { authorId: user.id });
    cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

import { Module } from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule { }

//InterfaceTypeとは、NestJSのGraphQLを提供するデコレーターです。
import { Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class Character {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}

@InterfaceType({
  resolveType(book) {
    if (book.colors) {
      return ColoringBook;
    }
    return TextBook;
  },
})
export abstract class Book {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}

//ResolveFieldとは、NestJSのGraphQLを提供するデコレーターです。
import { Resolver, ResolveField, Parent, Info } from "@nestjs/graphql";

@Resolver((type) => Character) // Reminder: Character is an interface
export class CharacterInterfaceResolver {
  @ResolveField(() => [Character])
  friends(
    @Parent() character, // Resolved object that implements Character
    @Info() { parentType }, // Type of the object that implements Character
    @Args("search", { type: () => String }) searchTerm: string
  ) {
    // Get character's friends
    return [];
  }
}

//createUnionTypeとは、NestJSのGraphQLを提供するメソッドです。
export const ResultUnion = createUnionType({
  name: "ResultUnion",
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

//CustomScalarとは、NestJSのGraphQLを提供するデコレーターです。
import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("Date", (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = "Date custom scalar type";

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}

//GraphQLJSONとは、NestJSのGraphQLを提供するデコレーターです。
import GraphQLJSON from "graphql-type-json";

@Module({
  imports: [
    GraphQLModule.forRoot({
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class AppModule { }


const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validate(uuid: unknown): string | never {
  if (typeof uuid !== "string" || !regex.test(uuid)) {
    throw new Error("invalid uuid");
  }
  return uuid;
}

export const CustomUuidScalar = new GraphQLScalarType({
  name: "UUID",
  description: "A simple UUID parser",
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => validate(ast.value),
});

//GraphQLJSONとは、NestJSのGraphQLを提供するデコレーターです。
import GraphQLJSON from "graphql-type-json";

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class AppModule { }

//Scalarとは、NestJSのGraphQLを提供するデコレーターです。
import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("Date")
export class DateScalar implements CustomScalar<number, Date> {
  description = "Date custom scalar type";

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}

//GraphQLDefinitionsFactoryとは、NestJSのGraphQLを提供するクラスです。
import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ["./src/**/*.graphql"],
  path: join(process.cwd(), "src/graphql.ts"),
  outputAs: "class",
  defaultScalarType: "unknown",
  customScalarTypeMapping: {
    DateTime: "Date",
    BigNumber: "_BigNumber",
  },
  additionalHeader: "import _BigNumber from 'bignumber.js'",
});

//
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule.register({ folder: "./config" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

//DynamicModuleとは、NestJSのモジュールを提供するクラスです。
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}

//
import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { EnvConfig } from "./interfaces";

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const options = { folder: "./config" };

    const filePath = `${process.env.NODE_ENV || "development"}.env`;
    const envFile = path.resolve(__dirname, "../../", options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

//DynamicModuleとは、NestJSのモジュールを提供するクラスです。
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "CONFIG_OPTIONS",
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

//
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Injectable, Inject } from "@nestjs/common";
import { EnvConfig } from "./interfaces";

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject("CONFIG_OPTIONS") private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || "development"}.env`;
    const envFile = path.resolve(__dirname, "../../", options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

//ModuleDefinitionとは、NestJSのモジュールを提供するクラスです。
import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigurableModuleClass } from "./config.module-definition";

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass { }


//Moduleとは、NestJSのモジュールを提供するクラスです。
import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from "./config.module-definition";

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.registerAsync(options),
    };
  }
}

//
import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from "./config.module-definition";

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.registerAsync(options),
    };
  }
}

//REQUESTとは、NestJSのリクエストを提供するクラスです。
import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private request: Request) {}
}

//INQUIRERとは、NestJSのクラスを提供するクラスです。
import { Inject, Injectable, Scope } from "@nestjs/common";
import { INQUIRER } from "@nestjs/core";

@Injectable({ scope: Scope.TRANSIENT })
export class HelloService {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sayHello(message: string) {
    console.log(`${this.parentClass?.constructor?.name}: ${message}`);
  }
}

//HelloServiceとは、NestJSのクラスを提供するクラスです。
import { Injectable } from "@nestjs/common";
import { HelloService } from "./hello.service";

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}

  getRoot(): string {
    this.helloService.sayHello("My name is getRoot");

    return "Hello world!";
  }
}

//HostComponentInfoとは、
import {
  HostComponentInfo,
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
} from "@nestjs/core";
import { Request } from "express";

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers["x-tenant-id"] as string;
    let tenantSubTreeId: ContextId;

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenants.set(tenantId, tenantSubTreeId);
    }

    // If tree is not durable, return the original "contextId" object
    return (info: HostComponentInfo) =>
      info.isTreeDurable ? tenantSubTreeId : contextId;
  }
}

//OnModuleInitとは、NestJSのモジュールを提供するクラスです。
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}


import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
