'use strict';

import zmq from 'zeromq';

const subscriber = zmq.socket('sub');

subscriber.subscribe('');

// Handle messages from the publisher
subscriber.on('message', data => {
  const message = JSON.parse(data.toString());
  const date = new Date(message.timestamp);

  console.log(`File "${message.file}" changed at ${date}`);
});

subscriber.connect('tcp://localhost:60400');
