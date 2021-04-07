let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const p_year = document.querySelector('#p_year');
const city = document.querySelector('#city');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

function Book(title, author, p_year, city) {
  this.title = title;
  this.author = author;
  this.p_year = p_year;
  this.city = city;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.p_year} p_year, ${this.city} city`;
};

function saveLibrary() {
  localStorage.library = JSON.stringify(library);
}

function showBooks() {
  container.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    const content = document.createElement('div');
    content.setAttribute('id', i);
    const text = document.createElement('p');
    text.textContent = library[i].info();
    content.appendChild(text);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, p_year.value, city.value);

  library.push(newBook);

  saveLibrary();
  showBooks();
}

function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}

function loadLibrary() {
  const books = JSON.parse(localStorage.lib);
  for (let i = 0; i < books.length; i += 1) {
    Object.setPrototypeOf(books[i], Book.prototype);
  }
  return books;
}

if (localStorage.lib) {
  library = loadLibrary();
  showBooks();
}

button.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', showForm);