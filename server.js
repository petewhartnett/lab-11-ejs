'use strict';

const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const pg = require('pg');

require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.post('/bookshelf', addDatabase);

app.get('/', (req, res) => {
    res.render('index');
});



function addDatabase(request, response) {
    const instruction = `INSERT INTO
    bookshelf (
      author,
      title,
      isbn,
      image_url,
      description,
      bookshelf
    )
  VALUES
    ( $1, $2, $3, $4, $5, $6) RETURNING id;`;
    const values = [request.body.author, request.body.title, request.body.isbn, request.body.image_url, request.body.description, request.body.bookshelf];
    console.log(values);
    client.query(instruction, values).then(sqlRes => {
      response.redirect(`/bookshelf/${sqlRes.rows[0].id}`)
    }).catch(e => errorHandler(e, response));
  }

// app.post('/', (req, res) => {
//     const instruction = 'SELECT * FROM bookshelf;';
//     client.query(instruction).then(function(sqlData){
//      // console.log('YOOOOOOO',sqlData.rows);
//       const bookArray = sqlData.rows;
//     console.log(bookArray[1]);
//       if(bookArray.length > 0){
//         // res.send(bookArray.title);

//         let testObject = {
            
//         }

//         res.render('index', { todoArray });
//       } else {
//         res.render('book-results');
//       }
  
//     });


//   });



function GoogleBooks(books) {
    this.title = books.title;
    this.author = books.author;
    this.description = books.description || 'No description available';
     this.img_url = books.imageLinks ? 'https' + books.imageLinks.thumbnail.slice(4) : '../img/book-icon.png'; //help from classmate for url portion 
    this.isbn = books.industryIdentifiers ? `${books.industryIdentifiers[0].type} ${books.industryIdentifiers[0].identifier}` : 'No isbn available';
    

}
app.get('/styles/styles.css', function(req, res){ res.send('/styles/styles.css'); res.end(); });



app.post('/', (req, res) => {
    const googleBookData = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author} `
    //console.log(req.body.author)
    superagent.get(googleBookData).then(bookData => {
        //console.log(bookData);
        const books = bookData.body.items.map(book => ({ title: book.volumeInfo.title, author: book.volumeInfo.authors }));
       // console.log(books);
        
        var objectArray = [];
     

    books.map(newBook => objectArray.push(new GoogleBooks(newBook)));
   // console.log (objectArray);

        res.render('book-results', {
            objectArray: objectArray
        });
    });
   
    
});


// app.post('/', (req, res) => {
//     const googleBookData = `https://www.googleapis.com/books/v1/volumes?q=book+ibook:${req.body.Book} `
//     superagent.get(googleBookData).then(bookData => {
//         //console.log(bookData);
//         const books = bookData.body.items.map(book => ({ title: book.volumeInfo.title, author: book.volumeInfo.authors }));
//        // console.log(books);
        
//         var objectArray = [];
     

//     books.map(newBook => objectArray.push(new GoogleBooks(newBook)));
//     console.log (objectArray);

//         res.render('book-results', {
//             objectArray: objectArray
//         });
//     });
   
    
// });

app.get('/*', function(request, response){
    response.status(404).send('Try again!')
  })
  
app.listen(3025, () => console.log('lets look for books'));