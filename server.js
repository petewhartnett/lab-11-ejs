'use strict';

const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});


function GoogleBooks(books){
    this.title = items.volumeInfo.author;
    this.author = author;

}

app.post('/', (req, res) => {
  const googleBookData =`https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author} `
    superagent.get(googleBookData).then(bookData => {
    const books = bookData.body.items.map(book => ({title: book.volumeInfo.title, author: book.volumeInfo.authors }));

    console.log(books);

    res.render('book-results', {
      books: books
    });
  });


});

app.listen(3000, () => console.log('lets look for books'));