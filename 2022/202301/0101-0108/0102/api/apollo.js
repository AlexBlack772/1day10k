//ApolloServerとは、GraphQLのサーバーを構築するためのライブラリ
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

//ApolloServer とは、GraphQLのサーバーを構築するためのライブラリ
const server = new ApolloServer < MyContext > ({
   typeDefs,
   resolvers,
});
await server.start();

app.use('/graphql', cors < cors.CorsRequest > (), json(), expressMiddleware(server));

//addPluginとは、ApolloServerにプラグインを追加するためのメソッド

//executeOperationとは、ApolloServerにクエリを実行するためのメソッド
const response = await server.executeOperation({
   query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
   variables: { name: 'world' },
});

//executeHTTPGraphQLRequestとは、ApolloServerにHTTPリクエストを実行するためのメソッド
const response = await server.executeHTTPGraphQLRequest({
   method: 'POST',
   url: '/graphql',
   headers: {
      'Content-Type': 'application/json',
   },
   body: {
      query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
      variables: { name: 'world' },
   },
});

//startStandaloneServerとは、ApolloServerを起動するためのメソッド
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

interface MyContext {
   token?: String;
}

const server = new ApolloServer < MyContext > ({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => ({ token: req.headers.token }),
   listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

//startStandaloneServerとは、ApolloServerを起動するためのメソッド
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

//expressMiddlewareとは、ApolloServerをExpressに統合するためのメソッド
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

//ApolloServerPluginUsageReportingとは、ApolloServerのプラグインで、アプリケーションの使用状況を収集するためのもの
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


//ApolloServerPluginUsageReporting とは、ApolloServerのプラグインで、アプリケーションの使用状況を収集するためのもの
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

//ApolloServerPluginUsageReportingDisabledとは、ApolloServerのプラグインで、アプリケーションの使用状況を収集しないためのもの
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginUsageReportingDisabled()],
});

//ApolloServerPluginSchemaReportingとは、ApolloServerのプラグインで、スキーマの使用状況を収集するためのもの
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginSchemaReporting()],
});

//ApolloServerPluginSchemaReportingDisabledとは、ApolloServerのプラグインで、スキーマの使用状況を収集しないためのもの
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginSchemaReportingDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginSchemaReportingDisabled()],
});

//ApolloServerPluginInlineTraceとは、ApolloServerのプラグインで、クエリの実行時間を収集するためのもの
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

//ApolloServerPluginInlineTraceDisabledとは、ApolloServerのプラグインで、クエリの実行時間を収集しないためのもの
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginInlineTraceDisabled()],
});

//expressMiddlewareとは、ApolloServerのプラグインで、Expressのミドルウェアを使用するためのもの
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

//ApolloServerPluginCacheControlとは、ApolloServerのプラグインで、キャッシュを使用するためのもの
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

//ApolloServerPluginCacheControlとは、ApolloServerのプラグインで、キャッシュを使用しないためのもの
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

//
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [ApolloServerPluginLandingPageDisabled()],
});

//ApolloServerPluginLandingPageGraphQLPlaygroundとは、ApolloServerのプラグインで、GraphQL Playgroundを使用するためのもの
import { ApolloServer } from '@apollo/server';
const myPlugin = {
   async serverWillStart() {
      console.log('Server starting up!');
   },
};

//requestDidStartとは、ApolloServerのプラグインで、リクエストが開始されたときに呼び出されるもの
const myPlugin = {
   async requestDidStart(requestContext) {
      console.log('Request started!');

      return {
         async parsingDidStart(requestContext) {
            console.log('Parsing started!');
         },

         async validationDidStart(requestContext) {
            console.log('Validation started!');
         },
      };
   },
};

//
const myPlugin = {
   async requestDidStart() {
      return {
         async parsingDidStart() {
            return async (err) => {
               if (err) {
                  console.error(err);
               }
            };
         },
         async validationDidStart() {
            // This end hook is unique in that it can receive an array of errors,
            // which will contain every validation error that occurred.
            return async (errs) => {
               if (errs) {
                  errs.forEach((err) => console.error(err));
               }
            };
         },
         async executionDidStart() {
            return {
               async executionDidEnd(err) {
                  if (err) {
                     console.error(err);
                  }
               },
            };
         },
      };
   },
};

//import { ApolloServer } from '@apollo/server';
import ApolloServerOperationRegistry from '@apollo/server-plugin-operation-registry';

/* This example doesn't provide `typeDefs` or `resolvers`,
   both of which are required to start the server. */
import { typeDefs, resolvers } from './separatelyDefined';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   // You can import plugins or define them in-line, as shown:
   plugins: [
      /* This plugin is from a package that's imported above. */
      ApolloServerOperationRegistry({
         /* options */
      }),

      /* This plugin is imported in-place. */
      require('./localPluginModule'),

      /* This plugin is defined in-line. */
      {
         async serverWillStart() {
            console.log('Server starting up!');
         },
      },
   ],
});

//
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async serverWillStart() {
            console.log('Server starting!');
         },
      },
   ],
});

//drainServerとは、ApolloServerのプラグインで、サーバーをシャットダウンするためのもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async serverWillStart() {
            return {
               async drainServer() {
                  await myCustomServer.drain();
               },
            };
         },
      },
   ],
});

//serverWillStopとは、ApolloServerのプラグインで、サーバーがシャットダウンするときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async serverWillStart() {
            const interval = setInterval(doSomethingPeriodically, 1000);
            return {
               async serverWillStop() {
                  clearInterval(interval);
               },
            };
         },
      },
   ],
});

//serverWillStopとは、ApolloServerのプラグインで、サーバーがシャットダウンするときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async serverWillStart() {
            const interval = setInterval(doSomethingPeriodically, 1000);
            return {
               async serverWillStop() {
                  clearInterval(interval);
               },
            };
         },
      },
   ],
});

//renderLandingPageとは、ApolloServerのプラグインで、ランディングページをレンダリングするためのもの
const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      {
         async serverWillStart() {
            return {
               //highlight-start
               async renderLandingPage() {
                  const html = `
              <!DOCTYPE html>
              <html>
                  <head>
                  </head>
                  <body>
                      <h1>Hello world!</h1>
                  </body>
              </html>`;
                  return { html };
               },
               //highlight-end
            };
         },
      },
   ],
});

//requestDidStartとは、ApolloServerのプラグインで、リクエストが開始されたときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async requestDidStart(requestContext) {
            // Within this returned object, define functions that respond
            // to request-specific lifecycle events.
            return {
               // The `parsingDidStart` request lifecycle event fires
               // when parsing begins. The event is scoped within an
               // associated `requestDidStart` server lifecycle event.
               async parsingDidStart(requestContext) {
                  console.log('Parsing started!');
               },
            };
         },
      },
   ],
});

//schemaDidLoadOrUpdateとは、ApolloServerのプラグインで、スキーマがロードまたは更新されたときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async serverWillStart() {
            return {
               schemaDidLoadOrUpdate({ apiSchema, coreSupergraphSdl }) {
                  console.log(`The API schema is ${printSchema(apiSchema)}`);
                  if (coreSupergraphSdl) {
                     console.log(`The core schema is ${coreSupergraphSdl}`);
                  }
               },
            };
         },
      },
   ],
});

//startupDidFailとは、ApolloServerのプラグインで、サーバーの起動に失敗したときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async startupDidFail({ error }) {
            console.log(`Startup failed: ${error}`);
         },
      },
   ],
});

//
didResolveOperation ? (
   requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'source' | 'queryHash' | 'document' | 'operationName'
   >,
): Promise<void>;

//contextCreationDidFailとは、ApolloServerのプラグインで、コンテキストの作成に失敗したときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async contextCreationDidFail({ error }) {
            console.log(`Context creation failed: ${error}`);
         },
      },
   ],
});

//
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async invalidRequestWasReceived({ error }) {
            console.log(`Bad request: ${error}`);
         },
      },
   ],
});

//unexpectedErrorProcessingRequestとは、ApolloServerのプラグインで、リクエストの処理中に予期しないエラーが発生したときに呼び出されるもの
const server = new ApolloServer({
   /* ... other necessary configuration ... */

   plugins: [
      {
         async unexpectedErrorProcessingRequest({ requestContext, error }) {
            console.log(`Something went wrong: ${error}`);
         },
      },
   ],
});

//gqlとは、GraphQLのクエリを作成するためのもの
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String
  }
`;

const resolvers = {
   Query: {
      me() {
         return { id: '1', username: '@ava' };
      },
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

// Note the top-level await!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);

//startStandaloneServerとは、ApolloServerを独立して起動するためのもの
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String
  }
`;

const resolvers = {
   Query: {
      me() {
         return { id: '1', username: '@ava' };
      },
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

// Note the top-level await!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);

//
const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    me: User
  }

  type User
    @key(fields: "id") { # highlight-line
    id: ID!
    username: String
  }
`;

const resolvers = {
   Query: {
      me() {
         return { id: '1', username: '@ava' };
      },
   },
   User: {
      __resolveReference(user, { fetchUserById }) {
         return fetchUserById(user.id);
      },
   },
};

//buildSubgraphSchemaとは、サブグラフのスキーマを作成するためのもの
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers = {
   Query: {
      me() {
         return { id: '1', username: '@ava' };
      },
   },
   User: {
      __resolveReference(user, { fetchUserById }) {
         return fetchUserById(user.id);
      },
   },
};

const server = new ApolloServer({
   schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);

//buildSubgraphSchemaとは、サブグラフのスキーマを作成するためのもの
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers = {
   Query: {
      me() {
         return { id: '1', username: '@ava' };
      },
   },
   User: {
      __resolveReference(user, { fetchUserById }) {
         return fetchUserById(user.id);
      },
   },
};

const server = new ApolloServer({
   schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

