'use strict';
import fs from 'fs';
import zmq from 'zeromq';

const filename = process.argv[2];

// create publisher endpoint
const publisher = zmq.socket('pub');

fs.watch(filename, () => {
  // sends a message to any and all subscribers
  publisher.send(
    JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    })
  );
});

publisher.bind('tcp://*:60400', err => {
  if (err) {
    throw err;
  }
  console.log('Listening for zmq subscribers...');
});
