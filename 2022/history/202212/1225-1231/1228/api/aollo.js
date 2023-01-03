import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//server.start()とは、サーバーを起動するためのメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors(), json(), expressMiddleware(server));

//ApolloServer({})とは、ApolloServerのコンストラクターです。
const server = new ApolloServer({
   typeDefs,
   plugins: [makeFirstPlugin()],
});

server.addPlugin(makeSecondPlugin(server));

//server.start()とは、サーバーを起動するためのメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});
await server.start();

//assertStarted()とは、サーバーが起動しているかどうかを確認するためのメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

await server.start();

server.assertStarted();

//executeOperation()とは、ApolloServerのexecuteOperation()メソッドです。
const response = await server.executeOperation({
   query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
   variables: { name: 'world' },
});

//stop()とは、サーバーを停止するためのメソッド
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//executeHTTPGraphQLRequest()とは、ApolloServerのexecuteHTTPGraphQLRequest()メソッドです。
const result = await server.executeHTTPGraphQLRequest({
   httpGraphQLRequest: OurHttpGraphQLRequest,
   context: async () => ({
      // token: ...,
   }),
});

//cacheControl()とは、ApolloServerのcacheControl()メソッドです。
const server = new ApolloServer({
   typeDefs,
   resolvers,
   cacheControl: {
      defaultMaxAge: 5,
   },
});

//applyMiddleware()とは、ApolloServerのapplyMiddleware()メソッドです。
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//startStandaloneServer()とは、ApolloServerのstartStandaloneServer()メソッドです。
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({ typeDefs, resolvers });

// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
const { url } = await startStandaloneServer(server);

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({ typeDefs, resolvers });

// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
const { url } = await startStandaloneServer(server);

//expressMiddleware()とは、ApolloServerのexpressMiddleware()メソッドです。
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({ typeDefs, resolvers });
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
   // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
   bodyParser.json({ limit: '50mb' }),
   // expressMiddleware accepts the same arguments:
   // an Apollo Server instance and optional configuration options
   expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
   }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

