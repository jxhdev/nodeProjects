'use strict';

import fs from 'fs';
import chai from 'chai';
import { parseRdf } from '../lib/parse-rdf';

const expect = chai.expect;

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

console.log(rdf);
describe('parseRDF', () => {
  it('should be a function', () => {
    expect(parseRdf).to.be.a('function');
  });

  it('should parse RDF content', () => {
    const book = parseRdf(rdf);
    console.log(book);
    expect(book).to.be.an('object');
    expect(book).to.have.property('id', 132);
  });
});
