// Ambil elemen
var addButton = document.getElementById("addButton");
var toDoEntryBox = document.getElementById("ltdAdd");
var toDoList = document.getElementById("ltdMain");

// Event tambah item
addButton.addEventListener("click", addToDoItem);

// Tambah item baru
function addToDoItem() {
  var itemText = toDoEntryBox.value.trim();
  if (itemText !== "") {
    newToDoItem(itemText, false);
    toDoEntryBox.value = ""; // reset input
  }
}

// Buat item baru
function newToDoItem(itemText, completed) {
  var toDoItem = document.createElement("li");
  var toDoText = document.createTextNode(itemText);

  toDoItem.appendChild(toDoText);

  if (completed) {
    toDoItem.classList.add("completed");
  }

  // Tambahkan ke list
  toDoList.appendChild(toDoItem);

  // Double klik untuk toggle selesai
  toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

// Toggle selesai / belum
function toggleToDoItemState() {
  if (this.classList.contains("completed")) {
    this.classList.remove("completed");
  } else {
    this.classList.add("completed");
  }
}

// Hapus item yang sudah selesai
function clearCompletedToDoItems() {
  var completedItems = toDoList.getElementsByClassName("completed");
  while (completedItems.length > 0) {
    completedItems[0].remove();
  }
}

// Kosongkan semua list
function emptyList() {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
}

// Simpan ke localStorage
function saveList() {
  var toDos = [];

  for (var i = 0; i < toDoList.children.length; i++) {
    var toDo = toDoList.children[i];
    var toDoInfo = {
      task: toDo.innerText,
      completed: toDo.classList.contains("completed"),
    };
    toDos.push(toDoInfo);
  }

  localStorage.setItem("toDos", JSON.stringify(toDos));
  console.log("Daftar disimpan ke localStorage.");
}

// Load dari localStorage
function loadList() {
  if (localStorage.getItem("toDos") !== null) {
    var toDos = JSON.parse(localStorage.getItem("toDos"));
    for (var i = 0; i < toDos.length; i++) {
      var toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed);
    }
  }
}

// Jalankan saat pertama kali
loadList();
