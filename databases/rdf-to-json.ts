#!/usr/bin/env node
import fs from 'fs';
import { parseRdf } from './lib/parse-rdf';

const rdf = fs.readFileSync(process.argv[2]);
const book = parseRdf(rdf);

console.log(JSON.stringify(book, null, ' '));
