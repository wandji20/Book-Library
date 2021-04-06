let myLibrary = [];

function Book(title, author, p_year, city) {
  this.title = title;
  this.author =author;
  this.p_year;
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

function display () {
  document.getElementById("d_area_1").innerHTML = document.getElementById("title").value;
  document.getElementById("title").value = "";
  document.getElementById("d_area_2").innerHTML = document.getElementById("author").value;
  document.getElementById("author").value = "";
  document.getElementById("d_area_3").innerHTML = document.getElementById("p_year").value;
  document.getElementById("p_year").value = "";
  document.getElementById("d_area_4").innerHTML = document.getElementById("city").value;
  document.getElementById("city").value = "";
}