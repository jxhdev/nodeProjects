'use strict';
import cheerio from 'cheerio';

interface Book {
  title: string;
  id: number;
  authors: any;
  subjects: any;
}

export const parseRdf = (rdf: any) => {
  const $ = cheerio.load(rdf);
  let book: Book = { title: '', id: 0, authors: [], subjects: [] };

  book.title = $('dcterms\\:title').text();

  book.id = +$('pgterms\\:ebook')
    .attr('rdf:about')
    .replace('ebooks/', '');

  book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray()
    .map(elem => $(elem).text());

  book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent()
    .find('rdf\\:value')
    .toArray()
    .map(elem => $(elem).text());

  return book;
};
