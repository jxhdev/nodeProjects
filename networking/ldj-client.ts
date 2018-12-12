import { EventEmitter } from 'events';

export class LDJClient extends EventEmitter {
  constructor(stream: EventEmitter) {
    super();
    let buffer = '';

    stream.on('data', data => {
      buffer += data;
      let boundary = buffer.indexOf(`\n`);
      while (boundary !== -1) {
        const input = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);
        this.emit('message', JSON.parse(input));
        boundary = buffer.indexOf(`\n`);
      }
    });
    stream.on('close', () => {});
  }

  static connect(stream: EventEmitter) {
    return new LDJClient(stream);
  }
}
