'use strict';

import fs from 'fs';
import chai from 'chai';
import { parseRdf } from '../lib/parse-rdf';

const expect = chai.expect;

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
  it('should be a function', () => {
    expect(parseRdf).to.be.a('function');
  });

  it('should parse RDF content', () => {
    const book = parseRdf(rdf);
    expect(book).to.be.an('array');
  });
});
