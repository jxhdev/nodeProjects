'use strict';

import * as fs from 'fs';
import * as net from 'net';

const filename = process.argv[2];

if (!filename) {
  throw Error('Error: no filename specified');
}

const server = net.createServer(connection => {
  // reporting
  console.log('subscriber connected.');
  connection.write(
    JSON.stringify({
      type: 'watching',
      file: filename
    }) + `\n`
  );

  // watcher setup
  const watcher = fs.watch(filename, () =>
    connection.write(
      JSON.stringify({ type: 'changed', timestamp: Date.now() }) + `\n`
    )
  );

  connection.on('close', () => {
    console.log('Subscriber disconnected');
    watcher.close();
  });
});

server.listen('60300', () => {
  console.log('listening for subscribers...');
});
