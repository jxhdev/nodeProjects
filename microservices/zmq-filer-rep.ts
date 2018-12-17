'use strict';
import fs from 'fs';
import zmq from 'zeromq';

// socket to reply to client requests
const responder = zmq.socket('rep');

// handle incoming requests

responder.on('message', data => {
  // parse the incoming message
  const request = JSON.parse(data.toString());
  console.log(`Received request to get: ${request.path}`);

  fs.readFile(request.path, (err, content) => {
    if (err) console.log(err);
    console.log(`Sending response content.`);
    responder.send(
      JSON.stringify({
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      })
    );
  });
});

responder.bind(`tcp://127.0.0.1:60401`, err => {
  if (err) console.log(err);
  console.log('Listening for zmq requesters');
});

process.on(`SIGINT`, () => {
  console.log('\nshutting down...');
  responder.close();
});
