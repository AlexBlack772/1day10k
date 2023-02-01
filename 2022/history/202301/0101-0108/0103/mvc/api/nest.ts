//Injectableとは、DIコンテナに登録することができるクラスを表すデコレーターです。
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

import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

//users / users.module.tsJS;

import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

//auth / auth.service.tsJS;
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

//auth / auth.module.tsJS;
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}

//
//auth / local.strategy.tsJS;
//PassportStrategyは、NestJSのPassportモジュールによって提供されるデコレーターです。
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

//auth / auth.module.tsJS;
//PassportModuleとは、NestJSのPassportモジュールによって提供されるデコレーターです。
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

//app.controller.tsJS;
//Controllerとは、NestJSのコントローラーによって提供されるデコレーターです。
import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    return req.user;
  }
}

//auth / local - auth.guard.tsJS;
//AuthGuardとは、NestJSのPassportモジュールによって提供されるデコレーターです。
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") { }

//auth / auth.service.tsJS;
//JwtServiceとは、NestJSのJWTモジュールによって提供されるデコレーターです。
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

//JwtModuleとは、NestJSのJWTモジュールによって提供されるデコレーターです。
//auth / auth.module.tsJS;

import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule { }

//
//app.controller.tsJS;

import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

//著者 / モデル / author.model.tsJS;
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "./post";

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post])
  posts: Post[];
}

//post.model.tsJS
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

//著者.resolver.tsJS;

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {}

  @Query((returns) => Author)
  async author(@Args("id", { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}

//著者 / 著者.resolver.tsJS;

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {}

  @Query((returns) => Author, { name: "author" })
  async getAuthor(@Args("id", { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField("posts", (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}

//dto / get - author.args.tsJS;
//MinLengthとは、NestJSのClassValidatorモジュールによって提供されるデコレーターです。
import { MinLength } from "class-validator";
import { Field, ArgsType } from "@nestjs/graphql";

@ArgsType()
class GetAuthorArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: "" })
  @MinLength(3)
  lastName: string;
}