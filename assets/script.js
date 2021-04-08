
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');


const bookFactory = (title, author, pages, read) => ({
  title, author, pages, read,
});

const info = (book) => {
  const readAlready = book.read ? 'This book is already read!' : 'This book is not read yet!';
  return `${book.title} by ${book.author}, ${book.pages} , ${readAlready}`;
};

const library = (() => {
  let mylibrary = [];
  function saveLibrary() {
    localStorage.lib = JSON.stringify(mylibrary);
  }

  function loadLibrary() {
    const books = JSON.parse(localStorage.lib);
    return books;
  }

  function changeRead() {
    mylibrary = loadLibrary();
    const { id } = this.parentNode;
    const paragraph = this.parentNode.querySelector('p');
    mylibrary[id].read = !mylibrary[id].read;
    saveLibrary();
    paragraph.innerHTML = info(loadLibrary()[id]);
  }

  function removeBook() {
    mylibrary = loadLibrary();

    const { id } = this.parentNode;
    mylibrary.splice(id, 1);
    saveLibrary(); // eslint-disable-next-line no-use-before-define
    showBooks();
  }

  function showBooks() {
    container.innerHTML = '';
    for (let i = 0; i < loadLibrary().length; i += 1) {
      const content = document.createElement('div');
      content.setAttribute('id', i);
      const text = document.createElement('p');
      text.textContent = info(loadLibrary()[i]);
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
    const newBook = bookFactory(title.value, author.value, pages.value, read.value);

    mylibrary.push(newBook);

    saveLibrary();
    showBooks();
  }


  return {
    saveLibrary, showBooks, loadLibrary, addBookToLibrary, changeRead, removeBook,
  };
})();

function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}

library.showBooks();

button.addEventListener('click', library.addBookToLibrary);

newBookBtn.addEventListener('click', showForm);
