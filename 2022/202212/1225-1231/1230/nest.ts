//indectableは、依存性の注入を可能にするためのデコレーターです。
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
   private readonly cats: Cat[] = [];

   findAll(): Cat[] {
      return this.cats;
   }
}

//Moduleとは、NestJSアプリケーションの一部分を表すクラスです。
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
   controllers: [CatsController],
   providers: [CatsService],
})
export class AppModule { }

//useValueは、依存性の注入に使用する値を指定します。
import { CatsService } from './cats.service';

const mockCatsService = {
   /* mock implementation
   ...
   */
};

@Module({
   imports: [CatsModule],
   providers: [
      {
         provide: CatsService,
         useValue: mockCatsService,
      },
   ],
})
export class AppModule { }

//useClassは、依存性の注入に使用するクラスを指定します。
const configServiceProvider = {
   provide: ConfigService,
   useClass:
      process.env.NODE_ENV === 'development'
         ? DevelopmentConfigService
         : ProductionConfigService,
};

@Module({
   providers: [configServiceProvider],
})
export class AppModule { }

//useFactoryは、依存性の注入に使用するファクトリ関数を指定します。
const configServiceProvider = {
   provide: ConfigService,
   useFactory: () => {
      if (process.env.NODE_ENV === 'development') {
         return new DevelopmentConfigService();
      }
      return new ProductionConfigService();
   }
};

@Module({
   providers: [
      connectionProvider,
      OptionsProvider,
      // { provide: 'SomeOptionalProvider', useValue: 'anything' },
   ],
})
export class AppModule { }

//
const connectionFactory = {
   provide: 'CONNECTION',
   useFactory: (optionsProvider: OptionsProvider) => {
      const options = optionsProvider.get();
      return new DatabaseConnection(options);
   },
   inject: [OptionsProvider],
};

@Module({
   providers: [connectionFactory],
   exports: ['CONNECTION'],
})
export class AppModule { }

//NestJSのコントローラーは、HTTPリクエストを処理するためのクラスです。
@Injectable()
export class CatsService {
   constructor(
      @Inject(forwardRef(() => CommonService))
      private commonService: CommonService,
   ) { }
}

//UsersModuleとは、NestJSアプリケーションの一部分を表すクラスです。
//UsersServiceは、UsersModuleのプロバイダーです。
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
   providers: [UsersService],
   exports: [UsersService],
})
export class UsersModule { }


//UsersControllerは、UsersModuleのコントローラーです。
@Injectable()
export class CatsService implements OnModuleInit {
   private service: Service;
   constructor(private moduleRef: ModuleRef) { }

   onModuleInit() {
      this.service = this.moduleRef.get(Service);
   }
}

//@Injectableとは、依存性の注入を可能にするためのデコレーターです
@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}
}

//exportとは、他のモジュールから使用できるようにするためのデコレーターです。
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}


//class-validatorとは、NestJSのバリデーションパイプに使用されるバリデーションライブラリです。
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}


@Get(':id')
findOne(@Param() params: FindOneParams) {
  return 'This action returns a user';
}

//
app.useGlobalPipes(
  new ValidationPipe({
    disableErrorMessages: true,
  }),
);
//app.useGlobalPipes(new ValidationPipe())とは、アプリケーション全体でバリデーションパイプを使用するためのメソッドです。

//UsePipesとは、コントローラーまたはメソッドにバリデーションパイプを適用するためのデコレーターです。
@Post()
@UsePipes(new ValidationPipe({ transform: true }))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

//UseGuardsとは、コントローラーまたはメソッドにガードを適用するためのデコレーターです。
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
  @Query('sort', ParseBoolPipe) sort: boolean,
) {
  console.log(typeof id === 'number'); // true
  console.log(typeof sort === 'boolean'); // true
  return 'This action returns a user';
}


//
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

//IntersectionType()とは、複数の型を結合するための関数です。

export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) { }

//PartialType()とは、既存の型のすべてのプロパティをオプションにするための関数です。

export class UpdateCatDto extends PartialType(CreateCatDto) { }

//CacheModuleとは、NestJSのキャッシュモジュールです。
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
})
export class AppModule {}


//Injectableとは、依存性の注入を可能にするためのデコレーターです。
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

//UsersModule とは、NestJSアプリケーションの一部分を表すクラスです。
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}

//passportとは、Node.jsの認証ライブラリです。
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }

//AuthGuardとは、NestJSの認証ガードです。
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//TypeOrmModuleとは、NestJSのTypeORMモジュールです。
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule { }

//import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}


//NestFactoryとは、NestJSアプリケーションを作成するためのファクトリークラスです。
const app = await NestFactory.create(AppModule, {
  logger: false,
});
await app.listen(3000);

//Loggerとは、NestJSのロガークラスです。
const app = await NestFactory.create(AppModule, {
  logger: new MyLogger(),
});
await app.listen(3000);

//NestExpressApplicationとは、NestJSのExpressアプリケーションクラスです。
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';

import { Logger, Injectable } from '@nestjs/common';

@Injectable()
class MyService {
  private readonly logger = new Logger(MyService.name);

  doSomething() {
    this.logger.log('Doing something...');
  }
}

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(express()),
   );
   await app.listen(3000);
}
bootstrap();


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

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
providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
],
   
//ValidationPipeとは、NestJSのバリデーションパイプです。
import { ValidationPipe } from '@nestjs/common';

import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = 'Password used to generate key';

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
const cipher = createCipheriv('aes-256-ctr', key, iv);

const textToEncrypt = 'Nest';
const encryptedText = Buffer.concat([
  cipher.update(textToEncrypt),
  cipher.final(),
]);

//createDecipherivとは、Node.jsの暗号化関数です。
import { createDecipheriv } from 'crypto';

const decipher = createDecipheriv('aes-256-ctr', key, iv);
const decryptedText = Buffer.concat([
  decipher.update(encryptedText),
  decipher.final(),
]);


import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post';

@ObjectType()
export class Author {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(type => [Post])
  posts: Post[];
}

//GraphQLModuleとは、NestJSのGraphQLモジュールです。
import { Module } from '@nestjs/common';

type Author {
  id: Int!
  firstName: String
  lastName: String
  posts: [Post!]!
}


import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Int, { nullable: true })
  votes?: number;
}

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}


//@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}


//PipeTransformとは、NestJSのパイプトランスフォームインターフェースです。
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}


@Post('file')
uploadFileAndPassValidation(
  @Body() body: SampleDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        // ... Set of file validator instances here
      ]
    })
  )
  file: Express.Multer.File,
) {
  return {
    body,
    file: file.buffer.toString(),
  };
}

//@UploadedFileとは、NestJSのアップロードファイルデコレーターです。
@UploadedFile(
  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  }),
)

//FilesInterceptorとは、NestJSのファイルインターセプターです。
file: Express.Multer.File,

@Post('upload')
@UseInterceptors(FilesInterceptor('files'))
uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  console.log(files);
}

//MulterModule.registerAsyncとは、NestJSのMulterモジュールの非同期登録です。
MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    dest: configService.get<string>('MULTER_DEST'),
  }),
  inject: [ConfigService],
});

//express-sessionとは、Node.jsのセッションミドルウェアです。
mport * as session from 'express-session';
// somewhere in your initialization file
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  }),
);

//SessionGuardとは、NestJSのセッションガードです。
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
