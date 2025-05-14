// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const tasks = getTasks();
  tasks.push(taskText);
  saveTasks(tasks);

  createTaskElement(taskText);
  taskInput.value = "";
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}

function createTaskElement(taskText, index) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = taskText;

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.onclick = () => deleteTask(index);

  li.appendChild(btn);
  taskList.appendChild(li);
}

// LocalStorage Helpers
function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();
}