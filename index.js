let debug = true;
function clg(variable) {
  if (debug) console.log(variable);
}

function retrieve() {
  let myNodelist = localStorage.getItem("node_list");
  if (!myNodelist) {
    clg("nothing in local storage ...");
    return false;
  }
  let lis = document.querySelector("#myUL");
  for (let i = 0; i < lis.length; i++) {
    clg("retrieve - removing: " + lis[i].textContent);
    lis[i].remove();
  }
  myNodelist = JSON.parse(myNodelist);
  clg("retrieve - node_list: " + localStorage.getItem("node_list"));
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
  add_edit_listener();
  add_close_listener();
  return true;
}

function add_close_listener() {
  clg("adding close listener");
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      clg("close - button");
      this.parentElement.parentElement.remove();
      save();
    };
  }
}

function save() {
  // ["name;checked",]
  let lis = document.querySelectorAll("#myUL>li>.noteText");
  let result = [];
  let name = "";
  for (let i = 0; i < lis.length; i++) {
    name = lis[i].innerHTML;
    clg("save - name: " + name);
    if (lis[i].parentElement.classList.contains("checked")) {
      name = name + ";1";
    } else {
      name = name + ";0";
    }
    result.push(name);
  }

  if (result.length === 0) {
    clg("save - node_list mt ");
    localStorage.removeItem("node_list");
    return false;
  }
  localStorage.setItem("node_list", JSON.stringify(result));
  clg("save - node_list: " + JSON.stringify(result));
}

// Modal Dialog for empty input
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

// Add a "checked" symbol when clicking on a list item
function add_check_listener() {
  clg("adding check listener");
  var list = document.querySelectorAll("#myUL>li");
  list.forEach((element) => {
    element.onclick = function (ev) {
      ev.target.classList.toggle("checked");
      clg("checked toggled");
      save();
    };
  });
}

if (!retrieve()) {
  // Click on a close button to hide the current list item
  add_close_listener();

  // Add "edit" functionality
  add_edit_listener();

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
    clg(newNote);
    noteList.appendChild(newNote);
  }
  // add event handler "close" to new element
  add_check_listener();
  add_edit_listener();
  add_close_listener();
  save();
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
