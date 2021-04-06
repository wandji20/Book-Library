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