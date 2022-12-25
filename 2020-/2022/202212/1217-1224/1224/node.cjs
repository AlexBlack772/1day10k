//httpとは、Webサーバーを作るためのモジュール
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   res.end('Hello World\n');
});

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});

// Much better!

const cluster = require('node:cluster');
const PORT = +process.env.PORT || 1337;

if (cluster.isPrimary) {
   // A more realistic scenario would have more than 2 workers,
   // and perhaps not put the primary and worker in the same file.
   //
   // It is also possible to get a bit fancier about logging, and
   // implement whatever custom logic is needed to prevent DoS
   // attacks and other bad behavior.
   //
   // See the options in the cluster documentation.
   //
   // The important thing is that the primary does very little,
   // increasing our resilience to unexpected errors.

   cluster.fork();
   cluster.fork();

   cluster.on('disconnect', (worker) => {
      console.error('disconnect!');
      cluster.fork();
   });

} else {
   // the worker
   //
   // This is where we put our bugs!

   const domain = require('node:domain');

   // See the cluster documentation for more details about using
   // worker processes to serve requests. How it works, caveats, etc.

   const server = require('node:http').createServer((req, res) => {
      const d = domain.create();
      d.on('error', (er) => {
         console.error(`error ${er.stack}`);

         // We're in dangerous territory!
         // By definition, something unexpected occurred,
         // which we probably didn't want.
         // Anything can happen now! Be very careful!

         try {
            // Make sure we close down within 30 seconds
            const killtimer = setTimeout(() => {
               process.exit(1);
            }, 30000);
            // But don't keep the process open just for that!
            killtimer.unref();

            // Stop taking new requests.
            server.close();

            // Let the primary know we're dead. This will trigger a
            // 'disconnect' in the cluster primary, and then it will fork
            // a new worker.
            cluster.worker.disconnect();

            // Try to send an error to the request that triggered the problem
            res.statusCode = 500;
            res.setHeader('content-type', 'text/plain');
            res.end('Oops, there was a problem!\n');
         } catch (er2) {
            // Oh well, not much we can do at this point.
            console.error(`Error sending 500! ${er2.stack}`);
         }
      });

      // Because req and res were created before this domain existed,
      // we need to explicitly add them.
      // See the explanation of implicit vs explicit binding below.
      d.add(req);
      d.add(res);

      // Now run the handler function in the domain.
      d.run(() => {
         handleRequest(req, res);
      });
   });
   server.listen(PORT);
}

// This part is not important. Just an example routing thing.
// Put fancy application logic here.
function handleRequest(req, res) {
   switch (req.url) {
      case '/error':
         // We do some async stuff, and then...
         setTimeout(() => {
            // Whoops!
            flerb.bark();
         }, timeout);
         break;
      default:
         res.end('ok');
   }
}

// Create a top-level domain for the server
const domain = require('node:domain');
const http = require('node:http');
const serverDomain = domain.create();

serverDomain.run(() => {
   // Server is created in the scope of serverDomain
   http.createServer((req, res) => {
      // Req and res are also created in the scope of serverDomain
      // however, we'd prefer to have a separate domain for each request.
      // create it first thing, and add req and res to it.
      const reqd = domain.create();
      reqd.add(req);
      reqd.add(res);
      reqd.on('error', (er) => {
         console.error('Error', er, req.url);
         try {
            res.writeHead(500);
            res.end('Error occurred, sorry.');
         } catch (er2) {
            console.error('Error sending 500', er2, req.url);
         }
      });
   }).listen(1337);
});

const d = domain.create();

function readSomeFile(filename, cb) {
   fs.readFile(filename, 'utf8', d.bind((er, data) => {
      // If this throws, it will also be passed to the domain.
      return cb(er, data ? JSON.parse(data) : null);
   }));
}

d.on('error', (er) => {
   // An error occurred somewhere. If we throw it now, it will crash the program
   // with the normal line number and stack message.
});

//domain.run()を使うと、その中で発生したエラーを、そのdomainでキャッチできる。
domain.run(() => {
      setTimeout(() => {
         throw new Error('Whoops!');
      }, 100);
})

//domain.on('error')でエラーをキャッチする。
domain.on('error', (er) => {
      console.error('Caught error!', er);
}
)

//domain.bind()を使うと、その中で発生したエラーを、そのdomainでキャッチできる。
domain.bind(() => {
      setTimeout(() => {
         throw new Error('Whoops!');
      }, 100);
}
)

//domain.intercept()を使うと、その中で発生したエラーを、そのdomainでキャッチできる。
domain.intercept(() => {
      setTimeout(() => {
         throw new Error('Whoops!');
      }, 100);
}
)

//domain.enter()を使うと、その中で発生したエラーを、そのdomainでキャッチできる。
domain.enter();
setTimeout(() => {
   throw new Error('Whoops!');
}
   , 100);
domain.exit();

//domain.exit()を使うと、その中で発生したエラーを、そのdomainでキャッチできる。
if (process.env.NODE_ENV === 'development') {
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
   app.use(express.errorHandler());
}

