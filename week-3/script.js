let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editId = null;

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.filter) {
      currentFilter = btn.dataset.filter;
      renderTasks();
    }
  });
});

document.getElementById("sortBtn").addEventListener("click", sortTasks);

function addTask() {
  const title = taskInput.value.trim();
  const date = dateInput.value;
  const priority = priorityInput.value;

  if (!title) return alert("Enter task title");

  if (editId) {
    tasks = tasks.map(task =>
      task.id === editId ? { ...task, title, date, priority } : task
    );
    editId = null;
    addBtn.innerText = "Add Task";
  } else {
    tasks.push({
      id: Date.now(),
      title,
      date,
      priority,
      completed: false
    });
  }

  taskInput.value = "";
  dateInput.value = "";
  priorityInput.value = "Low";

  saveAndRender();
}

function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filtered.map(task => {
    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> 
        <span>[${task.priority}]</span><br>
        <small>📅 ${task.date || "No date"}</small>
      </div>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="startEdit(${task.id})">✏</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

function startEdit(id) {
  const task = tasks.find(t => t.id === id);

  taskInput.value = task.title;
  dateInput.value = task.date;
  priorityInput.value = task.priority;

  editId = id;
  addBtn.innerText = "Update Task";
}

function sortTasks() {
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  saveAndRender();
}

function updateStats() {
  const total = tasks.length;

  const completed = tasks.reduce((acc, task) => {
    return task.completed ? acc + 1 : acc;
  }, 0);

  document.getElementById("total").innerText = `Total: ${total}`;
  document.getElementById("completed").innerText = `Completed: ${completed}`;
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
