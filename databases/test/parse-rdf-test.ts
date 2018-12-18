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
    expect(book).to.be.an('object');
    expect(book).to.have.property('id', 132);
  });

  it('should have the title', () => {
    const book = parseRdf(rdf);
    expect(book).to.have.property('title', 'The Art of War');
  });

  it('should have authors', () => {
    const book = parseRdf(rdf);
    expect(book)
      .to.have.property('authors')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Sunzi, active 6th century B.C.')
      .and.contains('Giles, Lionel');
  });

  it('should have subjects', () => {
    const book = parseRdf(rdf);

    expect(book)
      .to.have.property('subjects')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Military art and science -- Early works to 1800')
      .and.contains('War -- Early works to 1800');
  });
});
