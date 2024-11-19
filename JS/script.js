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

window.onload = () => {
  showGoal();
};//amkes sure the goals saved display when the page is loaded to ensure all goals show on refresh

addBookSubmit.addEventListener("click", () => {
  const Goal = addBookInput.value.trim(); //grabs what the user inputs &trims whitespace
  console.log(Goal);
  if (Goal) {
    //this stops the book from being added if user dosnt input a name
    createGoal(Goal);
  } else {
    alert("Enter a Goal before submitting");
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
       ${i+1+"."} <textarea disabled>${goalArray[i]}</textarea>
         <div class='checked'>
         <button class='completedbtn'>✅Mark Goal Completed</button>
        <button class="deletebtn">❌delete</button>
        <button class="editbtn">🛠️Edit</button>
        <h4 id='message'></h4>
        </div> 
    </div>

    <div class="update">
<button class="savebtn">Save☑️</button>
<button class="cancelbtn">cancel</button>
    </div>
</div>`;
  }
  // console.log(myGoals);
  document.querySelector(".allGoals").innerHTML = myGoals;
  activatedeleteGoal();
  editGoal();
  saveGoal();
  cancelEdit();
  completedGoal()
}

function activatedeleteGoal() {
  let dbtn = document.querySelectorAll(".deletebtn");
  dbtn.forEach((each, i) => {
    each.addEventListener("click", () => {
      deleteOne(i);
    });
  });
}
function deleteOne(i) {
  goalArray.splice(i, 1);
  console.log(goalArray);
  localStorage.setItem("goal", JSON.stringify(goalArray));
  location.reload();
}

function editGoal() {
  let editbtn = document.querySelectorAll(".editbtn");
  const updatefunctionailty = document.querySelectorAll(".update");
  const textareas = document.querySelectorAll(".goalInfo textarea");
  editbtn.forEach((each, i) => {
    each.addEventListener("click", () => {
      console.log(updatefunctionailty[i].display);
      updatefunctionailty[i].style.display = "block";
      textareas[i].disabled = false;
    });
  });
}

function saveGoal() {
  let savebtn = document.querySelectorAll(".savebtn");
  const textareas = document.querySelectorAll(".goalInfo textarea");
  savebtn.forEach((each, i) => {
    each.addEventListener("click", () => {
      updateGoal(textareas[1].value, i);
    });
  });
}

function updateGoal(updatedInfo, i) {
  goalArray[i] = updatedInfo;
  localStorage.setItem("goal", JSON.stringify(goalArray));
  location.reload();
}

function cancelEdit() {
  const cancelbtn = document.querySelectorAll(".cancelbtn");
  const updatefunctionailty = document.querySelectorAll(".update");
  const textareas = document.querySelectorAll(".goalInfo textarea");
  cancelbtn.forEach((each, i) => {
    each.addEventListener("click", () => {
      console.log(updatefunctionailty[i].display);
      updatefunctionailty[i].style.display = "none";
      textareas[i].disabled = true;
    });
  });
}

function completedGoal() {
  const completedbtn = document.querySelectorAll(".completedbtn");
 const msg=document.querySelectorAll('#message')
  const textareas = document.querySelectorAll(".goalInfo textarea");

  completedbtn.forEach((each, i) => {
    each.addEventListener("click", () => {
      if (textareas[i].className != "completed") {
        msg[i].innerText="Completed Task ✅"
        textareas[i].className = "completed";
        textareas[i].style.textDecoration = "line-through red";
      } else {
         msg[i].innerText=""
        textareas[i].className = "";
        textareas[i].style.textDecoration = "none";
      }
    });
  });
}





