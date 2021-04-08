let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

const Book = (title, author, pages, read) => {
  const getTitle = () => title;
  const getAuthor = () => author;
  const getPages = () => pages;
  const getRead = () => read;
  const readAlready = () => read ? 'This book is already read!' : 'This book is not read yet!';
  
  const info = () => `${getTitle()} written by ${getAuthor()}, ${getPages()} pages, Status: ${readAlready()}`;
  
  const changeRead = () => { read = !read; };

  return {changeRead, info, getTitle, getAuthor, getPages, getRead};
}

function saveLibrary() {
  const tmp = []

  for(let i = 0; i<library.length; i++){
    const information = [
      library[i].getTitle(),
      library[i].getAuthor(),
      library[i].getPages(),
      library[i].getRead()
    ];
    tmp.push(information);
  }
  localStorage.lib = JSON.stringify(tmp);
}

function removeBook() {
  const { id } = this.parentNode;
  library.splice(id, 1);
  saveLibrary(); // eslint-disable-next-line no-use-before-define
  showBooks();
}

function bookRead() {
  const { id } = this.parentNode;
  const para = this.parentNode.querySelector('p');
  library[id].changeRead();
  para.innerHTML = library[id].info();
  saveLibrary();
}

function showBooks() {
  container.innerHTML = '';
  for (let i = 0; i < library.length; i++) {
    const content = document.createElement('div');
    content.setAttribute('id', i);
    const text = document.createElement('p');
    text.textContent = library[i].info();

    const changeReadBtn = document.createElement('button');
    changeReadBtn.addEventListener('click', bookRead);
    changeReadBtn.textContent = 'Change read status';

    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.textContent = 'Remove this book';

    content.appendChild(text);
    content.appendChild(changeReadBtn);
    content.appendChild(removeBtn);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  const newBook = Book(title.value, author.value, pages.value, read.value);

  library.push(newBook);

  saveLibrary();
  showBooks();
}

function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}

function loadLibrary() {
  const temprorary = JSON.parse(localStorage.lib);
  const books = [];
  for (let i = 0; i < temprorary.length; i++) {
    books.push(Book(temprorary[i][0],temprorary[i][1],temprorary[i][2],temprorary[i][3]));
  }
  return books;
}

if (localStorage.lib) {
  library = loadLibrary();
  showBooks();
}

button.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', showForm);
