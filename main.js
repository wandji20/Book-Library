let myLibrary = [];

function Book(title, author, publication_year, city) {
  this.title = title;
  this.author =author;
  this.publication_year;
  this.city = city;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}