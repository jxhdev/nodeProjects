'use strict';
import zmq from 'zeromq';

const filename = process.argv[2];

// create request endpoint
const requester = zmq.socket('req');

// handle replies from the responder

requester.on('message', data => {
  const response = JSON.parse(data.toString());
  console.log('Received response: ', response);
});

requester.connect('tcp://localhost:60401');

console.log(`Sending a request for ${filename}`);
requester.send(
  JSON.stringify({
    path: filename
  })
);
