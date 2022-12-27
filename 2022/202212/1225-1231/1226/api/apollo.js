import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import type { DocumentNode } from 'graphql';

new ApolloServer({
   documentStore: new InMemoryLRUCache < DocumentNode > ({
      maxSize: Math.pow(2, 20) * approximateDocumentStoreMiB,
      sizeCalculation: InMemoryLRUCache.sizeCalculation,
   }),
   // ...
});

const server = new ApolloServer({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors(), json(), expressMiddleware(server));


const server = new ApolloServer({
   typeDefs,
   plugins: [makeFirstPlugin()],
});

server.addPlugin(makeSecondPlugin(server));

//assertStarted(server);とは、serverがstartされているかどうかを確認する関数
assertStarted(server);

//executeOperationは、serverに対してoperationを実行する関数
const result = await executeOperation(server, {
   query: gql`
      query {
         hello
      }
   `,
});

//assertSuccessは、resultが成功したかどうかを確認する関数
assertSuccess(result);

//executeHTTPGraphQLRequestは、serverに対してHTTPリクエストを実行する関数
const result = await executeHTTPGraphQLRequest(server, {
   method: 'POST',
   url: '/graphql',
   headers: {
      'Content-Type': 'application/json',
   },
   body: {
      query: 'query { hello }',
   },
});


const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
});

const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
});

//cacheとは、キャッシュのこと
const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
   cache: new InMemoryLRUCache < DocumentNode > ({
      maxSize: Math.pow(2, 20) * approximateDocumentStoreMiB,
      sizeCalculation: InMemoryLRUCache.sizeCalculation,
   }),
});

//loggerとは、ログのこと
const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
   logger: new Logger(),
});

//startStandaloneServerは、serverを起動する関数
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({ typeDefs, resolvers });

// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
const { url } = await startStandaloneServer(server);

// npm install @apollo/server graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

//expressMiddlewareは、expressのミドルウェアを返す関数
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

//expressMiddlewareは、expressのミドルウェアを返す関数
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';

const app = express();

const server = new ApolloServer({
   typeDefs,
   resolvers,
});
// Note you must call `server.start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', cors(), json(), expressMiddleware(server));

//highlight-end
// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schema';

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
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
   cors(),
   bodyParser.json(),
   // expressMiddleware accepts the same arguments:
   // an Apollo Server instance and optional configuration options
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);