// Modal Dialog for empty input
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement.parentElement;
    console.log(div);
    div.remove();
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelectorAll("#myUL>li");
list.forEach((element) => {
  element.addEventListener(
    "click",
    function (ev) {
      ev.target.classList.toggle("checked");
    },
    false
  );
});

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
    console.log(newNote);
    noteList.appendChild(newNote);
  }
  // add event handler "close" to new element
  // TODO: add event handler for edit and check also
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement.parentElement;
      div.remove();
    };
  }
}

// EXPERIMENTAL (Sven)
// TODO: try inplace edit with dblclick/click on div "noteText"
let editableList = document.getElementsByClassName("edit");
for (let i = 0; i < editableList.length; i++) {
  editableList[i].addEventListener(
    "click",
    function (ev) {
      let contentEdit = document.createAttribute("contenteditable");
      let checkAttr =
        ev.target.parentElement.parentElement.querySelector(".noteText");
      checkAttr.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          document.activeElement.blur();
          event.preventDefault();
        }
      });
      checkAttr.addEventListener("focusout", (event) => {
        checkAttr.removeAttribute("contenteditable");
      });
      checkAttr.setAttributeNode(contentEdit);
      // TODO: cursor ans Ende
      checkAttr.focus();
    },
    false
  );
}

//cursorPosition in contenteditable
function cursorPosition() {}

//addEventHanlder to newElement
function addMyEvents(handler, func) {
  //handler: click, dblclick, ...
  //func: function für event
}
