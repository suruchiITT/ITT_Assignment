let employees = [];
let index = 0;

let welcomeUser = document.getElementById("welcomeUser");

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "../auth/index.html";
}

welcomeUser.innerText = "Welcome " + currentUser.name;

async function loadEmployees() {
  try {
    let res = await fetch("employees.json");
    let data = await res.json();
    employees = data;
    showEmployee(0);
  } catch (err) {
    console.log("Error loading employees", err);
  }
}

loadEmployees();


function showEmployee(i) {
  empImg.src = employees[i].image;
  empName.innerText = employees[i].name;
  empDes.innerText = employees[i].designation;
  empProj.innerText = employees[i].project;
  empExp.innerText = employees[i].experience;
}

function next() {
  index = (index + 1) % employees.length;
  showEmployee(index);
}

function prev() {
  index = (index - 1 + employees.length) % employees.length;
  showEmployee(index);
}

let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../auth/index.html";
}
