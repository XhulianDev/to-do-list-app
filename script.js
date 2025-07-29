let inputElement = document.getElementById("input");
const addButton = document.getElementById("add-task-button");
let ul = document.getElementById("list");

function addTask() {
  let inputValue = inputElement.value;
  if (inputValue.trim() === '') {
    return
  }
  let listItem = document.createElement("li");
  listItem.textContent = inputValue;
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
  }
});
