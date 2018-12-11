'use strict';
import { connect } from 'net';
import { LDJClient } from './ldj-client';

const netClient = connect({ port: 60300 });
const ldjClient = LDJClient.connect(netClient);

ldjClient.on('message', message => {
  if (message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    console.log(`File changed: ${new Date(message.timestamp)}`);
  } else {
    throw Error(`Unrecognized message type: ${message.type}`);
  }
});
