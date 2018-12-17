'use strict';

import zmq from 'zeromq';

const router = zmq.socket('router');

router.on('message', (...frames) => {
  router.send(frames);
});

const dealer = zmq.socket('dealer');
dealer.on('message', (...frames) => {
  dealer.send(frames);
});
