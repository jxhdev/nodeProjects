'use strict';
import cheerio from 'cheerio';

interface Book {
  id: number;
}

export const parseRdf = (rdf: any) => {
  const $ = cheerio.load(rdf);
  let book: Book = { id: 0 };
  console.log($);

  book.id = +$('pgterms\\:ebook')
    .attr('rdf:about')
    .replace('ebooks/.', '');

  return book;
};
