'use strict';
import cluster from 'cluster';
import fs from 'fs';
import zmq from 'zeromq';
import { cpus } from 'os';

const numWorkers = cpus().length;

if (cluster.isMaster) {
  // master process creates ROUTER and DEALER sockets and binds endpoints
  const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
  const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

  // forward messages between routers and dealers
  router.on('message', (...frames) => {
    dealer.send(frames);
  });
  dealer.on('message', (...frames) => {
    router.send(frames);
  });

  // listen for workers to come online
  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  // fork a worker process for each CPU;
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
} else {
  // worker processes create a REPLY socket and connects to the DEALER
  const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

  responder.on('message', data => {
    // Parse incoming message
    const request = JSON.parse(data.toString());
    console.log(`${process.pid} received request for: ${request.path}`);

    // Read the file and reply with content
    fs.readFile(request.path, (err, content) => {
      if (err) {
        console.log(err);
      }
      console.log(`${process.pid} sending response`);
      responder.send(
        JSON.stringify({
          content: content.toString(),
          timestamp: Date.now(),
          pid: process.pid
        })
      );
    });
  });
}
