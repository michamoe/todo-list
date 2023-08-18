

function retrieve() {
  let myNodelist = localStorage.getItem("node_list");
  console.log("retrieving: ",myNodelist);
  if (!myNodelist) {
    console.log("nothing in local storage ...");
    return false;
  }
  let lis = document.getElementsByTagName("LI");
  for (let i = 0; i < lis.length; i++) {
    console.log('retrieve - removing: '+lis[i].textContent);
    lis[i].remove();
  }
  myNodelist = JSON.parse(myNodelist);
  console.log("retrieve - node_list: " + localStorage.getItem("node_list"));
  for (let i = 0; i < myNodelist.length; i++) {
    let li = document.createElement("li");
    let inputValue = myNodelist[i].split(";")[0];
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    if (myNodelist[i].split(";")[1] == "1") {
      li.classList.toggle("checked");
    }
  }
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
      save();
    };
  }
  var list = document.querySelector("ul");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        save();
      }
    },
    false
  );
  save();
  return true;
}

function save() {
  // ["name;checked",]
  let lis = document.getElementsByTagName("LI");
  let result = []
  let name = "";
  for (let i = 0; i < lis.length; i++) {
    name = lis[i].textContent.slice(0,-1);
    if(lis[i].classList.contains("checked")){
      name = name+";1";
    }
    else {
      name = name+";0";
    }
    result.push(name);
  }
  localStorage.setItem("node_list", JSON.stringify(result));
  console.log("save - node_list: " + JSON.stringify(result));
}

if (!retrieve()) {
  // Create a "close" button and append it to each list item
  let myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      // div.style.display = "none";
      div.remove();
      save();
    };
  }

  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector("ul");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        save();
      }
    },
    false
  );
  
  save();
}

// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// let i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function () {
//     let div = this.parentElement;
//     // div.style.display = "none";
//     div.remove();
//   };
// }

// Add a "checked" symbol when clicking on a list item
// var list = document.querySelector("ul");
// list.addEventListener(
//   "click",
//   function (ev) {
//     if (ev.target.tagName === "LI") {
//       ev.target.classList.toggle("checked");

//       // Storing data:
//       myNodelist = document.getElementsByTagName("LI");
//       const myJSON = JSON.stringify(myNodelist);
//       localStorage.setItem("node_list", myJSON);
//     }
//   },
//   false
// );

myDIV.addEventListener("submit", (event) => {
  event.preventDefault();
  newElement();
});

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
      save();
    };
  }
  save();
}

// sven
