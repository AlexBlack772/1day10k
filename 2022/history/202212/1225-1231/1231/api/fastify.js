// ESM
import Fastify from 'fastify'
const fastify = Fastify({
   logger: true
})
// CommonJs
const fastify = require('fastify')({
   logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
   reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
   if (err) {
      fastify.log.error(err)
      process.exit(1)
   }
   // Server is now listening on ${address}
})

//@typeとは、型定義をするためのものです。これを使うことで、IDEが型を補完してくれたり、型エラーを検知してくれたりします。
import Fastify from 'fastify'
import firstRoute from './our-first-route'
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
   logger: true
})

fastify.register(firstRoute)

fastify.listen({ port: 3000 }, function (err, address) {
   if (err) {
      fastify.log.error(err)
      process.exit(1)
   }
   // Server is now listening on ${address}
})

//registerとは、プラグインを登録するためのものです。プラグインとは、Fastifyの機能を拡張するためのものです。
const fastify = require('fastify')({
   logger: true
})

fastify.register(require('./our-db-connector'))
fastify.register(require('./our-first-route'))

fastify.listen({ port: 3000 }, function (err, address) {
   if (err) {
      fastify.log.error(err)
      process.exit(1)
   }
   // Server is now listening on ${address}
})

//fastifyMongoとは、MongoDBを使うためのプラグインです。
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
   fastify.register(fastifyMongo, {
      url: 'mongodb://localhost:27017/test_database'
   })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)

//
sync function routes(fastify, options) {
   const collection = fastify.mongo.db.collection('test_collection')

   fastify.get('/', async (request, reply) => {
      return { hello: 'world' }
   })

   fastify.get('/animals', async (request, reply) => {
      const result = await collection.find().toArray()
      if (result.length === 0) {
         throw new Error('No documents found')
      }
      return result
   })

   fastify.get('/animals/:animal', async (request, reply) => {
      const result = await collection.findOne({ animal: request.params.animal })
      if (!result) {
         throw new Error('Invalid value')
      }
      return result
   })

   const animalBodyJsonSchema = {
      type: 'object',
      required: ['animal'],
      properties: {
         animal: { type: 'string' },
      },
   }

   const schema = {
      body: animalBodyJsonSchema,
   }

   fastify.post('/animals', { schema }, async (request, reply) => {
      // we can use the `request.body` object to get the data sent by the client
      const result = await collection.insertOne({ animal: request.body.animal })
      return result
   })
}

module.exports = routes

//
const Fastify = require('fastify')

const provider = require('./provider')

const server = Fastify({ logger: true })
const USUAL_WAIT_TIME_MS = 5000

server.get('/ping', function (request, reply) {
   reply.send({ error: false, ready: request.server.magicKey !== null })
})

server.post('/webhook', function (request, reply) {
   // It's good practice to validate webhook requests really come from
   // whoever you expect. This is skipped in this sample for the sake
   // of simplicity

   const { magicKey } = request.body
   request.server.magicKey = magicKey
   request.log.info('Ready for customer requests!')

   reply.send({ error: false })
})

server.get('/v1*', async function (request, reply) {
   try {
      const data = await provider.fetchSensitiveData(request.server.magicKey)
      return { customer: true, error: false }
   } catch (error) {
      request.log.error({
         error,
         message: 'Failed at fetching sensitive data from provider',
      })

      reply.statusCode = 500
      return { customer: null, error: true }
   }
})

server.decorate('magicKey', null)

server.listen({ port: '1234' }, () => {
   provider.thirdPartyMagicKeyGenerator(USUAL_WAIT_TIME_MS)
      .catch((error) => {
         server.log.error({
            error,
            message: 'Got an error while trying to get the magic key!'
         })

         // Since we won't be able to serve requests, might as well wrap
         // things up
         server.close(() => process.exit(1))
      })
})

//
const { fetch } = require('undici')
const { setTimeout } = require('timers/promises')

const MAGIC_KEY = '12345'

const delay = setTimeout

exports.thirdPartyMagicKeyGenerator = async (ms) => {
   // Simulate processing delay
   await delay(ms)

   // Simulate webhook request to our server
   const { status } = await fetch(
      'http://localhost:1234/webhook',
      {
         body: JSON.stringify({ magicKey: MAGIC_KEY }),
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
      },
   )

   if (status !== 200) {
      throw new Error('Failed to fetch magic key')
   }
}

exports.fetchSensitiveData = async (key) => {
   // Simulate processing delay
   await delay(700)
   const data = { sensitive: true }

   if (key === MAGIC_KEY) {
      return data
   }

   throw new Error('Invalid key')
}

//
const Fastify = require('fastify')

const customerRoutes = require('./customer-routes')
const { setup, delay } = require('./delay-incoming-requests')

const server = new Fastify({ logger: true })

server.register(setup)

// Non-blocked URL
server.get('/ping', function (request, reply) {
   reply.send({ error: false, ready: request.server.magicKey !== null })
})

// Webhook to handle the provider's response - also non-blocked
server.post('/webhook', function (request, reply) {
   // It's good practice to validate webhook requests really come from
   // whoever you expect. This is skipped in this sample for the sake
   // of simplicity

   const { magicKey } = request.body
   request.server.magicKey = magicKey
   request.log.info('Ready for customer requests!')

   reply.send({ error: false })
})

// Blocked URLs
// Mind we're building a new plugin by calling the `delay` factory with our
// customerRoutes plugin
server.register(delay(customerRoutes), { prefix: '/v1' })

server.listen({ port: '1234' })


//
const { fetch } = require('undici')
const { setTimeout } = require('timers/promises')

const MAGIC_KEY = '12345'

const delay = setTimeout

exports.thirdPartyMagicKeyGenerator = async (ms) => {
   // Simulate processing delay
   await delay(ms)

   // Simulate webhook request to our server
   const { status } = await fetch(
      'http://localhost:1234/webhook',
      {
         body: JSON.stringify({ magicKey: MAGIC_KEY }),
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
      },
   )

   if (status !== 200) {
      throw new Error('Failed to fetch magic key')
   }
}

exports.fetchSensitiveData = async (key) => {
   // Simulate processing delay
   await delay(700)
   const data = { sensitive: true }

   if (key === MAGIC_KEY) {
      return data
   }

   throw new Error('Invalid key')
}

//
const fp = require('fastify-plugin')

const provider = require('./provider')

module.exports = fp(async function (fastify) {
   fastify.get('*', async function (request, reply) {
      try {
         const data = await provider.fetchSensitiveData(request.server.magicKey)
         return { customer: true, error: false }
      } catch (error) {
         request.log.error({
            error,
            message: 'Failed at fetching sensitive data from provider',
         })

         reply.statusCode = 500
         return { customer: null, error: true }
      }
   })
})

const delay = (routes) =>
   function (fastify, opts, done) {
      // Make sure customer requests won't be accepted if the magicKey is not
      // available
      fastify.addHook('onRequest', function (request, reply, next) {
         if (!request.server.magicKey) {
            reply.statusCode = 503
            reply.header('Retry-After', USUAL_WAIT_TIME_MS)
            reply.send({ error: true, retryInMs: USUAL_WAIT_TIME_MS })
         }

         next()
      })

      // Register to-be-delayed routes
      fastify.register(routes, opts)

      done()
   }