
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');



// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// Book.prototype.info = function Pro() {
//   const readAlready = this.read
//     ? 'This book is already read!'
//     : 'This book is not read yet!';
//   return `${this.title} by ${this.author}, ${this.pages} , ${readAlready}`;
// };

const bookFactory = (title, author, pages, read) => {
  
  return {title, author, pages, read, info};
}

const info = (book) => {
  const readAlready = book.read? 'This book is already read!' : 'This book is not read yet!';
  return `${book.title} by ${book.author}, ${book.pages} , ${readAlready}`;
}

const library = (() =>{
  
  mylibrary = []
  function saveLibrary() {
    localStorage.lib = JSON.stringify(mylibrary);
  }

  function loadLibrary() {
    const books = JSON.parse(localStorage.lib);
    return books;
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
    const newBook = bookFactory (title.value, author.value, pages.value, read.value);
  
    mylibrary.push(newBook);
  
    saveLibrary();
    showBooks();
  }
  
  function changeRead() {
    mylibrary = loadLibrary()
    const { id } = this.parentNode;
    const paragraph = this.parentNode.querySelector('p');
    mylibrary[id].read = !mylibrary[id].read;
    saveLibrary();
    paragraph.innerHTML = info(loadLibrary()[id]);
  }
  
  function removeBook() {
    const { id } = this.parentNode;
    library.splice(id, 1);
    saveLibrary(); // eslint-disable-next-line no-use-before-define
    showBooks();
  };
  return {saveLibrary, showBooks, loadLibrary,addBookToLibrary, changeRead, removeBook };
  
})();


// const book = (() => {
  

//   return {}
// })()








function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}




if (localStorage.lib) {
  mylibrary = library.loadLibrary();
  library.showBooks();
}


button.addEventListener('click', library.addBookToLibrary);

newBookBtn.addEventListener('click', showForm);
