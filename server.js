'use strict';

const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});


function GoogleBooks(books) {
    this.title = books.title;
    this.author = books.author;

}

app.post('/', (req, res) => {
    const googleBookData = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author} `
    superagent.get(googleBookData).then(bookData => {
        //console.log(bookData);
        const books = bookData.body.items.map(book => ({ title: book.volumeInfo.title, author: book.volumeInfo.authors }));
       // console.log(books);
        //var objectBlock = JSON.parse(JSON.stringify(books));
        var objectArray = [];
     

    books.map(newBook => objectArray.push(new GoogleBooks(newBook)));
    console.log (objectArray);

        res.render('book-results', {
            objectArray: objectArray
        });
    });
   

});

app.listen(3005, () => console.log('lets look for books'));