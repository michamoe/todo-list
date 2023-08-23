let debug = false;
function clg(variable) {
  if (debug) console.log(variable);
}

function setTodoTemplate(inputValue, checked = false) {
  return `
   ${
     checked
       ? `<i class="bi bi-check-circle"></i>`
       : `<i class="bi bi-circle"></i>`
   }
  <div class="noteText">${inputValue}</div>
  <div class="icons">    
    <i class="bi bi-pencil edit"></i>
    <i class="bi bi-trash close"></i>
  </div>`;
}

function add_close_listener() {
  clg("adding close listener");
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      clg("close - button");
      this.parentElement.parentElement.remove();
    };
  }
}

// Modal Dialog for empty input
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

// Add a "checked" symbol when clicking on a list item
function add_check_listener() {
  clg("adding check listener");
  var list = document.querySelectorAll("#myUL > li > i");
  list.forEach((element) => {
    element.onclick = function (ev) {
      ev.target.parentElement.classList.toggle("checked"); //li
      ev.target.classList.toggle("bi-check-circle"); // i
      ev.target.classList.toggle("bi-circle"); // i
      clg("checked toggled");
    };
  });
}

// Click on a close button to hide the current list item
add_close_listener();

// Add "edit" functionality
add_edit_listener();

// Add a "checked" symbol when clicking on a list item
add_check_listener();

// Prevent form submit, fire newElement(), reset input
myDIV.addEventListener("submit", (event) => {
  event.preventDefault();
  newElement(document.getElementById("myInput").value);
  document.getElementById("myInput").value = ""; // reset input
});

// Create a new list item in ul #myUL
function newElement(noteText) {
  noteText = noteText.replace(/(<([^>]+)>)/gi, "");
  noteText = noteText.replace(";", "");
  if (noteText === "") {
    myModal.toggle();
  } else {
    let noteList = document.querySelector("#myUL");
    const newNote = document.createElement("li");
    newNote.classList.add("d-flex");
    newNote.innerHTML = setTodoTemplate(noteText, false);
    clg(newNote);
    noteList.appendChild(newNote);
  }
  // add event handlers to new element
  add_check_listener();
  add_edit_listener();
  add_close_listener();
}

// Add edit listener to "edit" icon
function add_edit_listener() {
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
          save();
        });
        checkAttr.setAttributeNode(contentEdit);
        Cursor.setCurrentCursorPosition(checkAttr.innerText.length, checkAttr);
        checkAttr.focus();
      },
      false
    );
  }
}
// Set cursorPosition in contenteditable to the end
// Credit to Liam (Stack Overflow)
// https://stackoverflow.com/a/41034697/3480193
class Cursor {
  static getCurrentCursorPosition(parentElement) {
    var selection = window.getSelection(),
      charCount = -1,
      node;

    if (selection.focusNode) {
      if (Cursor._isChildOf(selection.focusNode, parentElement)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;

        while (node) {
          if (node === parentElement) {
            break;
          }

          if (node.previousSibling) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
            if (node === null) {
              break;
            }
          }
        }
      }
    }

    return charCount;
  }

  static setCurrentCursorPosition(chars, element) {
    if (chars >= 0) {
      var selection = window.getSelection();

      let range = Cursor._createRange(element, { count: chars });

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  static _createRange(node, chars, range) {
    if (!range) {
      range = document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = Cursor._createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }

    return range;
  }

  static _isChildOf(node, parentElement) {
    while (node !== null) {
      if (node === parentElement) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }
}

// Demo entries
let demos = [
  "Buy apples",
  "Buy bananas",
  "Do the laundry",
  "Learn React.js",
  "Uninstall Bring!",
  "Call mom",
  "Win the lottery",
  "Start a business",
];
for (i = 0; i < demos.length; i++) {
  newElement(demos[i]);
}
