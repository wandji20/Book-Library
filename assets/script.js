let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function Pro() {
  const readAlready = this.read
    ? 'This book is already read!'
    : 'This book is not read yet!';
  return `${this.title} by ${this.author}, ${this.pages} , ${readAlready}`;
};

function saveLibrary() {
  localStorage.lib = JSON.stringify(library);
}

function changeRead() {
  const { id } = this.parentNode;
  const paragraph = this.parentNode.querySelector('p');
  library[id].read = !library[id].read;
  paragraph.innerHTML = library[id].info();
  saveLibrary();
}

function removeBook() {
  const { id } = this.parentNode;
  library.splice(id, 1);
  saveLibrary(); // eslint-disable-next-line no-use-before-define
  showBooks();
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

    const changeReadBtn = document.createElement('button');
    changeReadBtn.addEventListener('click', changeRead);
    changeReadBtn.textContent = 'Change read status';

    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.textContent = 'Remove Book';

    content.appendChild(text);
    content.appendChild(changeReadBtn);
    content.appendChild(removeBtn);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, pages.value, read.value);

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
