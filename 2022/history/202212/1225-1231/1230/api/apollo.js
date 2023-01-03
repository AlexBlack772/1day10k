// ApolloServerとは、GraphQLのサーバーを作成するためのライブラリ
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//InMemoryLRUCacheは、キャッシュを作成するためのライブラリ
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import type { DocumentNode } from 'graphql';

new ApolloServer({
   documentStore: new InMemoryLRUCache < DocumentNode > ({
      maxSize: Math.pow(2, 20) * approximateDocumentStoreMiB,
      sizeCalculation: InMemoryLRUCache.sizeCalculation,
   }),
   // ...
});

//start()は、サーバーを起動するためのメソッド
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors < cors.CorsRequest > (), json(), expressMiddleware(server));

//addPlugin()は、プラグインを追加するためのメソッド
const server = new ApolloServer({
   typeDefs,
   plugins: [makeFirstPlugin()],
});

server.addPlugin(makeSecondPlugin(server));

//executeOperation()とは、GraphQLのクエリを実行するためのメソッド
const response = await server.executeOperation({
   query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
   variables: { name: 'world' },
});

//executeHTTPGraphQLRequest()とは、HTTPリクエストを実行するためのメソッド
const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
});

//startStandaloneServer()とは、独立したサーバーを起動するためのメソッド
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({ typeDefs, resolvers });

// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
const { url } = await startStandaloneServer(server);

//startStandaloneServerとは、独立したサーバーを起動するためのメソッド
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

//expressMiddleware()とは、Expressのミドルウェアを作成するためのメソッド
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

//expressMiddleware()とは、Expressのミドルウェアを作成するためのメソッド
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

// expressMiddlewareとは、Expressのミドルウェアを作成するためのメソッド
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

//ApolloServerPluginUsageReportingとは、Apollo Serverの使用状況を収集するためのプラグイン
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      // Sets a non-default option on the usage reporting plugin
      ApolloServerPluginUsageReporting({
         sendVariableValues: { all: true },
      }),
   ],
});

//usageReportingとは、Apollo Serverの使用状況を収集するためのプラグイン
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

//ApolloServerPluginUsageReportingDisabledとは、Apollo Serverの使用状況を収集しないためのプラグイン
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginUsageReportingDisabled()],
});

//schemaReportingとは、Apollo Serverのスキーマを収集するためのプラグイン
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginSchemaReporting()],
});

new ApolloServer({
   plugins: [
      ApolloServerPluginSchemaReporting({
         overrideReportedSchema: schema
      }),
      ApolloServerPluginUsageReporting({
         overrideReportedSchema: schema
      }),
   ],
   // ...
})

//ApolloServerPluginInlineTraceとは、Apollo Serverのトレースを収集するためのプラグイン
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

//ApolloServerPluginLandingPageDisabledとは、Apollo Serverのランディングページを無効にするためのプラグイン
//drainHttpServerとは、Apollo ServerのHTTPサーバーを終了するためのプラグイン
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

//cacheControlとは、Apollo Serverのキャッシュコントロールを有効にするためのプラグイン
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

//Configuring default landing pagesとは、Apollo Serverのランディングページを設定するためのプラグイン
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === 'production'
         ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'my-graph-id@my-graph-variant',
            footer: false,
         })
         : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
   ],
});

