
class Node {
  constructor(task) {
    this.task = task;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(task) {
    const node = new Node(task);
    if (!this.head) return this.head = node;

    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  remove(id) {
    if (!this.head) return;

    if (this.head.task.id === id) {
      this.head = this.head.next;
      return;
    }

    let cur = this.head;
    while (cur.next && cur.next.task.id !== id) {
      cur = cur.next;
    }

    if (cur.next) cur.next = cur.next.next;
  }

  toArray() {
    let arr = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.task);
      cur = cur.next;
    }
    return arr;
  }

  clear() {
    this.head = null;
  }
}

class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}


class TaskManager {
  constructor() {
    if (TaskManager.instance) return TaskManager.instance;

    this.list = new LinkedList();
    this.observer = new Observer();

    TaskManager.instance = this;
  }

  addTask(task) {
    this.list.add(task);
    this.observer.notify(this.list.toArray());
  }

  deleteTask(id) {
    this.list.remove(id);
    this.observer.notify(this.list.toArray());
  }

  toggleTask(id) {
    const arr = this.list.toArray();
    arr.forEach(t => {
      if (t.id === id) t.completed = !t.completed;
    });
    this.reload(arr);
  }

  editTask(id, data) {
    const arr = this.list.toArray();
    arr.forEach(t => {
      if (t.id === id) Object.assign(t, data);
    });
    this.reload(arr);
  }

  reload(arr) {
    this.list.clear();
    arr.forEach(t => this.list.add(t));
    this.observer.notify(arr);
  }

  sortByDate() {
    const sorted = mergeSort(this.list.toArray());
    this.reload(sorted);
  }

search(title) {
  if (!title) return null;

  const arr = this.list
    .toArray()
    .sort((a, b) => a.title.localeCompare(b.title));

  return binarySearch(arr, title);
}

}


function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(l, r) {
  let res = [];

  while (l.length && r.length) {
    res.push(new Date(l[0].date) < new Date(r[0].date) ? l.shift() : r.shift());
  }

  return [...res, ...l, ...r];
}


function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;

  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (arr[m].title === target) return arr[m];
    arr[m].title < target ? l = m + 1 : r = m - 1;
  }

  return null;
}


const manager = new TaskManager();
let currentFilter = "all";
let editId = null;

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

manager.observer.subscribe(renderTasks);

addBtn.onclick = () => {
  const title = taskInput.value.trim();
  const date = dateInput.value;
  const priority = priorityInput.value;

  if (!title) return alert("Enter task title");

  if (editId) {
    manager.editTask(editId, { title, date, priority });
    editId = null;
    addBtn.innerText = "Add Task";
  } else {
    manager.addTask({
      id: Date.now(),
      title,
      date,
      priority,
      completed: false
    });
  }

  taskInput.value = "";
  dateInput.value = "";
};

document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.filter) {
      currentFilter = btn.dataset.filter;
      renderTasks(manager.list.toArray());
    }
  };
});

document.getElementById("sortBtn").onclick = () => manager.sortByDate();

searchInput.oninput = e => {
  const res = manager.search(e.target.value);
  if (res) alert("Found: " + res.title);
};


function renderTasks(tasks) {
  taskList.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <span>[${task.priority}]</span><br>
        <small>📅 ${task.date || "No date"}</small>
      </div>
      <div>
        <button onclick="manager.toggleTask(${task.id})">✔</button>
        <button onclick="startEdit(${task.id})">✏</button>
        <button onclick="manager.deleteTask(${task.id})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats(tasks);
}

function startEdit(id) {
  const t = manager.list.toArray().find(x => x.id === id);
  taskInput.value = t.title;
  dateInput.value = t.date;
  priorityInput.value = t.priority;
  editId = id;
  addBtn.innerText = "Update Task";
}

function updateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.reduce((a,t)=> t.completed ? a+1 : a, 0);

  document.getElementById("total").innerText = `Total: ${total}`;
  document.getElementById("completed").innerText = `Completed: ${completed}`;
}
