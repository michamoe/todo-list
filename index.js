function retrieve() {
  let myNodelist = localStorage.getItem("node_list");
  if (!myNodelist) {
    console.log("nothing in local storage ...");
    return false;
  }
  let lis = document.querySelector("#myUL");
  for (let i = 0; i < lis.length; i++) {
    console.log('retrieve - removing: '+lis[i].textContent);
    lis[i].remove();
  }
  myNodelist = JSON.parse(myNodelist);
  console.log("retrieve - node_list: " + localStorage.getItem("node_list"));
  for (let i = 0; i < myNodelist.length; i++) {

    let inputValue = myNodelist[i].split(";")[0];
    let noteList = document.querySelector("#myUL");
    const templateString = `<div class="noteText">${inputValue}</div>
    <div class="icons">
      <i class="bi bi-check-circle check"></i>
      <i class="bi bi-pencil edit"></i>
      <i class="bi bi-trash close"></i>
    </div>`;
    const newNote = document.createElement("li");
    newNote.classList.add("d-flex");    
    if (myNodelist[i].split(";")[1] == "1") {
      newNote.classList.add("checked");
    }
    newNote.innerHTML = templateString;
    noteList.appendChild(newNote);

  }
  save();
  add_check_listener();
  add_close_listener();
  return true;
}

function add_close_listener(){
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      div.remove();
      save();
    };
  }
}


function save() {
  // ["name;checked",]
  let lis = document.querySelectorAll("#myUL>li>.noteText");
  let result = []
  let name = "";
  for (let i = 0; i < lis.length; i++) {
    name = lis[i].innerHTML;
    console.log('save - name: '+name);
    if(lis[i].parentElement.classList.contains("checked")){
      name = name+";1";
    }
    else {
      name = name+";0";
    }
    result.push(name);
  }

  if (result.length === 0) {
    console.log("save - node_list mt ");
    localStorage.removeItem("node_list");
    return false;
  }
  localStorage.setItem("node_list", JSON.stringify(result));
  console.log("save - node_list: " + JSON.stringify(result));
}



// Modal Dialog for empty input
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

// Click on a close button to hide the current list item
add_close_listener();

// Add a "checked" symbol when clicking on a list item
function add_check_listener() {
  console.log('adding check listener');
  let list = document.querySelectorAll("#myUL>li");
  list.forEach((element) => {
    element.addEventListener(
      "click",
      function (ev) {
        ev.target.classList.toggle("checked");
        console.log('checked toggled');
        save();
      },
      false
    );
  });
}


if (!retrieve()) {

  // Click on a close button to hide the current list item
  add_close_listener();

  // Add a "checked" symbol when clicking on a list item
  add_check_listener();
  
  save();
}






// Prevent form submit, fire newElement(), reset input
myDIV.addEventListener("submit", (event) => {
  event.preventDefault();
  newElement();
  document.getElementById("myInput").value = ""; // reset input
});

// Create a new list item in ul #myUL
function newElement() {
  if (document.getElementById("myInput").value === "") {
    myModal.toggle();
  } else {
    let noteText = document.getElementById("myInput").value;
    let noteList = document.querySelector("#myUL");
    const templateString = `<div class="noteText">${noteText}</div>
    <div class="icons">
      <i class="bi bi-check-circle check"></i>
      <i class="bi bi-pencil edit"></i>
      <i class="bi bi-trash close"></i>
    </div>`;
    const newNote = document.createElement("li");
    newNote.classList.add("d-flex");
    newNote.innerHTML = templateString;
    noteList.appendChild(newNote);
  }
  // add event handler "close" to new element
  add_close_listener();
  add_check_listener();
  save();
}

// EXPERIMENTAL (Sven)
// TODO: try inplace edit with dblclick/click on div "noteText"
let editableList = document.querySelectorAll(".edit");
for (let i = 0; i < editableList.length; i++) {
  editableList[i].addEventListener(
    "click",
    function (ev) {
      let contentEdit = document.createAttribute("contenteditable");
      let checkAttr =
        ev.target.parentElement.parentElement.querySelector(".noteText");
      console.log(checkAttr);
      checkAttr.innerText += " Test";
    },
    false
  );
}
