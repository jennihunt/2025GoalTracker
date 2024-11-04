console.log("hey")


    // this will show the elements in that will be mapped out 
const inventoryList = document.getElementById("allBooksList");
const addBookInput = document.getElementById("todoinput");
const addBookSubmit = document.getElementById("addBook");
//const li=document.createElement("li")
loadSavedBooks();
// document.addEventListener("DOMContentLoaded", getLocalTodos)
addBookSubmit.addEventListener("click", addBook);

function addBook(e) {
  e.preventDefault();
  const NewBook = addBookInput.value.trim(); //trims whitespace
  console.log(NewBook);
  if (NewBook) {
    //this stops the book from being added if user dosnt input a name
    createBookElememnt(NewBook);
    addBookInput.value = "";
    saveinMyLocalStorage()
  } else {
    alert("Enter a book name");
  }
}

function createBookElememnt(book) {
  const listItem = document.createElement("li");
  listItem.textContent = book;
  inventoryList.appendChild(listItem);
}



function saveinMyLocalStorage(){
let books=[]
console.log('in local storage')
inventoryList.querySelectorAll('li').forEach((each)=>books.push(each.textContent.trim())) //this pushes each book info into the books array
console.log(books,JSON.stringify(books))
localStorage.setItem('books',JSON.stringify(books)) //turns info into a JSON to be stored in local storage

}

//the below function reloads the book inventory so on reload local storage can be viewed
function loadSavedBooks(){
const Books=JSON.parse(localStorage.getItem('books'))||[]; //this allows us to transfer our info from JSON back to a string and if local storage is empty then it returns an empty array

Books.forEach(createBookElememnt)

}