// Create a "close" button and append it to each list item
let myNodelist = localStorage.getItem("node_list");
console.log("node_list: " + localStorage.getItem("node_list"));




function retrieve() {
  let myNodelist = localStorage.getItem("node_list");
  if (!myNodelist) return false;
  myNodelist = JSON.parse(myNodelist);
  console.log("node_list: " + localStorage.getItem("node_list"));
  for (let i = 0; i < myNodelist.length; i++) {
    let li = document.createElement("li");
    let inputValue = myNodelist[i].split(";")[0];
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    if (myNodelist[i].split(";")[0] == "1") {
      li.classList.toggle("checked");
    }
  }
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
    };
  }
  var list = document.querySelector("ul");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    },
    false
  );
}

function save() {
  // ["name;checked",]
  let lis = document.getElementsByTagName("LI");
  //set html
  for (let i = 0; i < lis.length; i++) {
    document.getElementById("myUL").appendChild(lis[i]);
    console.log('lis[i].textContent: '+lis[i].textContent);
  }
}

save();

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
  console.log("ich war hier");
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

  // Storing data:
  myNodelist = document.getElementsByTagName("LI");
  const myJSON = JSON.stringify(myNodelist);
  localStorage.setItem("node_list", myJSON);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
    };
  }
}

// sven
