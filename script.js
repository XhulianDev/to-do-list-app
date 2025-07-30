let inputElement = document.getElementById("input");
const addButton = document.getElementById("add-task-button");
const removeAll = document.getElementById("clear-completed-button");
let ul = document.getElementById("list");

function addTask() {
  let inputValue = inputElement.value;
  if (inputValue.trim() === '') {
    return
  }
  let listItem = document.createElement("li");
  listItem.textContent = inputValue;
  const removeTask = document.createElement("span");
  removeTask.className = "delete-button";
  removeTask.textContent = 'X';
  listItem.appendChild(removeTask);
  ul.appendChild(listItem);
  inputElement.value = '';
  saveData();
}

addButton.addEventListener("click", () => { addTask(); });

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
    saveData();
  } else if (event.target.className === "delete-button") {
    let li = event.target.parentNode;
    li.remove();
    saveData();
  }
});

removeAll.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll("li.completed");
  completedTasks.forEach((task) => {
    task.remove();
  });
  saveData();
});

function saveData() {
  const allTasks = document.querySelectorAll("li");
  let tasksToSave = [];
  
  allTasks.forEach((task) => {
    const taskData = {
      text: task.textContent.replace('X', ''),
      completed: task.classList.contains("completed")
    };
    tasksToSave.push(taskData);
  });
  
  let dataToSave = JSON.stringify(tasksToSave);
  localStorage.setItem("data", dataToSave);
}

function showTask() {
  let storedData = localStorage.getItem("data");
  let tasks = JSON.parse(storedData) || [];
  
  ul.innerHTML = "";
  
  tasks.forEach((taskData) => {
    let listItem = document.createElement("li");
    listItem.textContent = taskData.text;
    
    if (taskData.completed) {
      listItem.classList.add("completed");
    }
    
    const removeTask = document.createElement("span");
    removeTask.className = "delete-button";
    removeTask.textContent = 'X';
    
    listItem.appendChild(removeTask);
    ul.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showTask();
});