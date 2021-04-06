let myLibrary = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const p_year = document.querySelector('#p_year');
const city = document.querySelector('#city');
const form = document.querySelector('.form');
const f_submit = document.querySelector('#f_submit');


function Book(title, author, p_year, city) {
  this.title = title;
  this.author =author;
  this.p_year = p_year;
  this.city = city;
}

function saveLibrary() {
  localStorage.lib = JSON.stringify(myLibrary);
}


var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function displayBooks(){
  container.innerHTML = "";

  for(let i= 0; i<library.length; i++){
    const content = document.createElement('div');
    content.setAttribute('id',i);
    const text = document.createElement('p');
    text.textContent = library[i].info();

    content.appendChild(text);
    container.appendChild(content);
  }
}

function addBookToLibrary(){
  const newBook = new Book(title.value, author.value, p_year.value, city.value);
  myLibrary.push(newBook);
  saveLibrary();
  displayBooks();
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
