'use strict';

import dir from 'node-dir';
import { parseRdf } from './lib/parse-rdf';

const dirname = process.argv[2];
const options = {
  match: /\.rdf$/,
  exclude: ['pg0.rdf']
};

dir.readFiles(dirname, options, (err, content, next) => {
  if (err) throw err;
  const doc = parseRdf(content);
  console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }));
  console.log(JSON.stringify(doc));
  next();
});

process.stdout.on('error', () => process.exit());
