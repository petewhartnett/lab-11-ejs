


CREATE TABLE bookshelf (
  id SERIAL PRIMARY KEY,
  author VARCHAR (255),
  title VARCHAR (255),
  isbn NUMERIC (9,8), 
  image_url VARCHAR(255),
  description VARCHAR (255),
  bookshelf VARCHAR (255)
  );



  INSERT INTO bookshelf(author, title, isbn, image_url, description, bookshelf)
    Values('Nicholas G. Carr', 'The Shallows', '9', 'http://books.google.com/books/content?id=9-8jnjgYrgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Expanding on an article that appeared in the Atlantic Monthly, the best-selling author of The Big Switch discusses the intellectual and cultural consequences of the Internet, and how it may be transforming our neural pathways for the worse.', 'Computers');