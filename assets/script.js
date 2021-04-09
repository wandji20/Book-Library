const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');



class Book{

  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info = () => {
    const readAlready = this.read == true ? 'This book is already read!' : 'This book is not read yet!';
    return `${this.title} by ${this.author}, ${this.pages} , ${readAlready}`;
  };

  
}


class Library{
  
  static showForm() {
    form.classList.toggle('hidden');
    button.classList.toggle('hidden');
  }
  

  static loadLibrary() {

    let real_books = [];
    let books;
    if(localStorage.getItem('lib') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('lib'));
    }

    for(let i = 0; i< books.length; i++){
      real_books.push(new Book(books[i].title, books[i].author, books[i].pages, books[i].read ))
    }

    return real_books;
  }
  
}



function changeRead() {
  let mylibrary = Library.loadLibrary();
  const { id } = this.parentNode;
  const paragraph = this.parentNode.querySelector('p');
  mylibrary[id].read = !mylibrary[id].read;
  localStorage.lib = JSON.stringify(mylibrary);
  paragraph.innerHTML = Library.loadLibrary()[id].info();
}

function removeBook() {
  let mylibrary = Library.loadLibrary();
  
  const { id } = this.parentNode;
  mylibrary.splice(id, 1);
  localStorage.lib = JSON.stringify(mylibrary);// eslint-disable-next-line no-use-before-define
  showBooks();
}

function showBooks() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  for (let i = 0; i < Library.loadLibrary().length; i += 1) {
    const content = document.createElement('div');
    content.setAttribute('id', i);
    const text = document.createElement('p');
    text.textContent = Library.loadLibrary()[i].info();
    content.appendChild(text);
    container.appendChild(content);
    
    const changeReadBtn = document.createElement('button');
    changeReadBtn.addEventListener('click', this.changeRead);
    changeReadBtn.textContent = 'Change read status';
    
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', this.removeBook);
    removeBtn.textContent = 'Remove Book';
    
    content.appendChild(text);
    content.appendChild(changeReadBtn);
    content.appendChild(removeBtn);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  let library = Library.loadLibrary()
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');

  // const r1 = document.getElementById('read');
  // const r2 = document.getElementById('unread');
  
  const r1 = document.getElementById('read');
  const r2 = document.getElementById('unread');
  const getReadValue = () =>{
    let read;
    if (r1.checked == true){
      read = true;
    }else if(r2.checked == true){
      read = false;
    }
    
    return read;
  
  }
  
  const read = getReadValue();
  ;


  if (title.value && author.value && pages.value && read != null ){
    const newBook = new Book(title.value, author.value, pages.value, read );
    library.push(newBook);
    console.log(library);
    localStorage.lib = JSON.stringify(library);

  }else{
    alert('Please fill all fields')
  }

  showBooks();
}





showBooks();

button.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', Library.showForm);



const r1 = document.getElementById('read');
const r2 = document.getElementById('unread');
const getReadValue = () =>{
  let read;
  if (r1.checked == true){
    read = true;
  }else if(r2.checked == true){
    read = false;
  }
  
  return read;

}