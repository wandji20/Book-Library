let myLibrary = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const p_year = document.querySelector('#p_year');
const city = document.querySelector('#city');
// const button = document.querySelector('#btn');
// const read = document.querySelector('#read');
const form = document.querySelector('.form');
const f_submit = document.querySelector('#f_submit');


function Book(title, author, p_year, city) {
  this.title = title;
  this.author =author;
  this.p_year = p_year;
  this.city = city;
}

// function addBookToLibrary(book) {
//   myLibrary.push(book);
// }

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

function addBookToLibrary(){

  document.getElementByClassName('content').addEventListener('Submit', (e) => {

   e.preventDefault();

   let title = document.getElementById('title').value;
   
   let author = document.getElementById('author').value;
   let p_year = document.getElementById('p_year').value;
   let city = document.getElementById('city').value;
   let book = new Book(title, author, p_year, city);
   console.log(author)
  addBookToTable(book);
  myLibrary.push(book);
 })
}

function addBookToTable(book) {
  const table = document.getElementById('t_body')
  const row = document.createElement('tr')
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.p_year}</td>
  <td>${book.city}</td>`;
  table.appendChild(row);
}


let book1 = {
  title:'Critical Thinking',
  author: 'Jon',
  p_year: 2035,
  city: 'Camer'
}
let book2 = {
  title:'Critical Thinking',
  author: 'Jon',
  p_year: 2035,
  city: 'Camer'
}
let book3 = {
  title:'Critical Thinking',
  author: 'Jon',
  p_year: 2035,
  city: 'Camer'
}
// addBookToTable(book)
for(let book in myLibrary){
  // console.log(myLibrary[book])
  addBookToTable(myLibrary[book]);
}

