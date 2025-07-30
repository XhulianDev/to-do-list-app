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
  } else if (event.target.className === "delete-button") {
    let li = event.target.parentNode;
    li.remove();
  }
});

removeAll.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll("li.completed");
  completedTasks.forEach((task) => {
    task.remove();
  });
});
