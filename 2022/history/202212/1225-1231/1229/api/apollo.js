//ApolloServerとは、GraphQLのサーバーを構築するためのライブラリ
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//introspectionとは、GraphQLのスキーマを取得するためのクエリを実行できるかどうかを指定するメソッド

//fieldResolverとは、フィールドの解決を行う関数を指定するメソッド

//start()とは、サーバーを起動するメソッド
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors < cors.CorsRequest > (), json(), expressMiddleware(server));

//stop()とは、サーバーを停止するメソッド
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors < cors.CorsRequest > (), json(), expressMiddleware(server));

//startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()とは、サーバーを起動するメソッド

//addPlugin(plugin)とは、プラグインを追加するメソッド
const server = new ApolloServer({
   typeDefs,
   plugins: [makeFirstPlugin()],
});

server.addPlugin(makeSecondPlugin(server));

//assertStarted()とは、サーバーが起動しているかどうかを確認するメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

await server.start();


//executeOperation()とは、オペレーションを実行するメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//executeOperation()の第一引数には、オペレーションのオプションを指定するオブジェクトを渡す
const response = await server.executeOperation({
   query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
   variables: { name: 'world' },
});

//executeHTTPGraphQLRequest()とは、HTTPリクエストを実行するメソッド
const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
}); 

//startStandaloneServer()とは、独立したサーバーを起動するメソッド
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({ typeDefs, resolvers });

// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
const { url } = await startStandaloneServer(server);

//startStandaloneServer()の第一引数には、ApolloServerのインスタンスを渡す
// npm install @apollo/server graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

const server = new ApolloServer < MyContext > ({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

//expressMiddleware()とは、Expressのミドルウェアを返すメソッド
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

const server = new ApolloServer < MyContext > ({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);


import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

const server = new ApolloServer < MyContext > ({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
   '/',
   cors < cors.CorsRequest > (),
   // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
   bodyParser.json({ limit: '50mb' }),
   // expressMiddleware accepts the same arguments:
   // an Apollo Server instance and optional configuration options
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

// Modified server startup
await new Promise < void> ((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

//expressMiddleware()の第一引数には、ApolloServerのインスタンスを渡す
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';

const app = express();

const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
});
// Note you must call `server.start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', cors < cors.CorsRequest > (), json(), expressMiddleware(server));
//highlight-end

//ApolloServerPluginDrainHttpServerとは、ApolloServerのプラグインで、httpServerをドレインする
// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
   '/',
   cors < cors.CorsRequest > (),
   bodyParser.json(),
   // expressMiddleware accepts the same arguments:
   // an Apollo Server instance and optional configuration options
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

// Modified server startup
await new Promise < void> ((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

//expressMiddleware()の第一引数には、ApolloServerのインスタンスを渡す
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginUsageReporting({
         fieldLevelInstrumentation: 0.5,
      }),
   ],
});

//apollo-server-expressを使う
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginUsageReporting({
         fieldLevelInstrumentation: 0.5,
      }),
   ],
});

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginUsageReportingDisabled()],
});

//ApolloServerPluginSchemaReportingとは、ApolloServerのプラグインで、スキーマレポートを送信する
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginSchemaReporting()],
});

//ApolloServerPluginInlineTraceとは、ApolloServerのプラグインで、インライントレースを有効にする
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginInlineTrace({
         includeErrors: { transform: (err) => (err.message.match(SENSITIVE_REGEX) ? null : err) },
      }),
   ],
});

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginInlineTraceDisabled()],
});


import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
   '/graphql',
   cors < cors.CorsRequest > (),
   json(),
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

await new Promise < void> ((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

//ApolloServerPluginLandingPageGraphQLPlaygroundとは、ApolloServerのプラグインで、GraphQLPlaygroundを表示する
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs, resolvers } from './schema';

interface MyContext {
   token?: String;
}

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
   '/graphql',
   cors < cors.CorsRequest > (),
   json(),
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

await new Promise < void> ((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

//Cache control pluginとは、ApolloServerのプラグインで、キャッシュコントロールを有効にする
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginCacheControl()],
});

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginCacheControl({
         // Cache everything for 1 second by default.
         defaultMaxAge: 1,
         // Don't send the `cache-control` response header.
         calculateHttpHeaders: false,
      }),
   ],
});


