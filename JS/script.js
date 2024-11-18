console.log("hey");

// this will show the elements that will be used from the HTML page
const inventoryList = document.getElementById("allGoals");
const addBookInput = document.getElementById("bookinput");
const addBookSubmit = document.getElementById("addBook");
// const genreInputs = document.getElementById("genres");
const goalArray = localStorage.getItem("goal")
  ? JSON.parse(localStorage.getItem("goal"))
  : [];
console.log(goalArray);
// loadSavedBooks(); //we use this function call to make sure on load our items saved to local storage will show

addBookSubmit.addEventListener("click", () => {
  const Goal = addBookInput.value.trim(); //grabs what the user inputs &trims whitespace
  console.log(Goal);
  // const Genre = genreInputs.options[genreInputs.selectedIndex].text;
  //console.log(Genre);
  if (Goal) {
    //this stops the book from being added if user dosnt input a name
    createGoal(Goal);
  } else {
    alert("Enter a book name");
  }
});

function createGoal(goal) {
  goalArray.push(goal);
  localStorage.setItem("goal", JSON.stringify(goalArray));
  location.reload();
}

function showGoal() {
  let myGoals = "";
  for (let i = 0; i < goalArray.length; i++) {
    myGoals += `<div id="eachGoal">
    <div class="goalInfo">
        <textarea disabled>${goalArray[i]}</textarea>
         <div class='checked'>
            <button class="deletebtn">❌</button>
        <button class="editbtn">🛠️Edit</button></div> 
    

    <div class="update">
<button class="savebtn">Save☑️</button>
<button class="cancelbtn">cancel</button>
    </div>
</div>`;
  }
  console.log(myGoals);
  document.getElementsByClassName("allGoals").innerHTML = myGoals;
  deleteGoal();
  // editGoal();
  // saveGoal();
  //cancelListner();
}

function deleteGoal() {
  let dbtn = document.querySelectorAll(".deletebtn");
  dbtn.forEach((each, i) => {
    each.addEventListener("click", () => delete i);
  });
}
function deleteOne(i) {
  goalArray.splice(i, 1);
  localStorage.setItem("goal", JSON.stringify(goalArray));
  location.reload();
}

// function saveinMyLocalStorage() {
//   let books = [];
//   console.log("in local storage");
//   inventoryList
//     .querySelectorAll("li") //.substring(0,each.lastIndexOf('Genre')).trim()
//     .forEach((each) => {
//       console.log(each)
//       // if(each.text){

//       // }
//       books.push(
//         each.textContent.substring(0, each.textContent.lastIndexOf("Remove"))
//       );
//     }); //this pushes each book info into the books array
//   console.log(books, JSON.stringify(books));
//   localStorage.setItem("books", JSON.stringify(books)); //turns info into a JSON to be stored in local storage
// }

// //the below function reloads the book inventory so on reload local storage can be viewed
// function loadSavedBooks() {
//   console.log(JSON.parse(localStorage.getItem("books")));
//   const Books = JSON.parse(localStorage.getItem("books")) || []; //this allows us to transfer our info from JSON back to a string and if local storage is empty then it returns an empty array
//   console.log(Books);
//   Books.forEach(createBookElememnt);
// }
window.onload=()=>{
  showGoal()
}