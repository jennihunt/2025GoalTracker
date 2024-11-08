console.log("hey");

// this will show the elements that will be used from the HTML page
const inventoryList = document.getElementById("allBooksList");
const addBookInput = document.getElementById("bookinput");
const addBookSubmit = document.getElementById("addBook");
const genreInputs = document.getElementById("genres");

loadSavedBooks(); //we use this function call to make sure on load our items saved to local storage will show

addBookSubmit.addEventListener("click", addBook);

function addBook(e) {
  e.preventDefault();
  const NewBook = addBookInput.value.trim(); //grabs what the user inputs &trims whitespace
  console.log(NewBook);
  const Genre = genreInputs.options[genreInputs.selectedIndex].text;
  console.log(Genre);
  if (NewBook && Genre) {
    //this stops the book from being added if user dosnt input a name
    createBookElememnt(NewBook, Genre);
    addBookInput.value = "";
    saveinMyLocalStorage();
  } else {
    alert("Enter a book name");
  }
}

function createBookElememnt(book, genre) {
  const listItem = document.createElement("li");
  listItem.textContent = book;
 
//   if (     //sandboxed until i can better work out the kinks
//     listItem.textContent.indexOf("Genre") ==
//     listItem.textContent.lastIndexOf("Genre")
//   ) {
//     listItem.textContent += " Genre " + genre;
//   }

  const deleteBook = document.createElement("button"); //create a delete button on each book added to libraray
  deleteBook.textContent = "Remove from Library";
  deleteBook.className = "deleteBtn"; //creats class for styling

  listItem.appendChild(deleteBook);
  inventoryList.appendChild(listItem);

  deleteBook.addEventListener("click", () => {
    inventoryList.removeChild(listItem);
    saveinMyLocalStorage();
  });
}

function saveinMyLocalStorage() {
  let books = [];
  console.log("in local storage");
  inventoryList
    .querySelectorAll("li") //.substring(0,each.lastIndexOf('Genre')).trim()
    .forEach((each) => {
      // if(each.text){

      // }
      books.push(
        each.textContent.substring(0, each.textContent.lastIndexOf("Remove"))
      );
    }); //this pushes each book info into the books array
  console.log(books, JSON.stringify(books));
  localStorage.setItem("books", JSON.stringify(books)); //turns info into a JSON to be stored in local storage
}

//the below function reloads the book inventory so on reload local storage can be viewed
function loadSavedBooks() {
  console.log(JSON.parse(localStorage.getItem("books")));
  const Books = JSON.parse(localStorage.getItem("books")) || []; //this allows us to transfer our info from JSON back to a string and if local storage is empty then it returns an empty array
  console.log(Books);
  Books.forEach(createBookElememnt);
}
