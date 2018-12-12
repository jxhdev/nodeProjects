'use strict';
import 'mocha';

import * as assert from 'assert';
import { EventEmitter } from 'events';
import { LDJClient } from './ldj-client';

describe('LDJClient', () => {
  let stream: EventEmitter;
  let client: LDJClient;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });
    stream.emit('data', `{"foo":"bar"}\n`);
  });

  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });
    stream.emit('data', `{"foo":`);
    process.nextTick(() => {
      stream.emit('data', `"bar"}\n`);
    });
  });
});
