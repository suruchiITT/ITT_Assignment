let employees = [];
let index = 0;

let user = localStorage.getItem("name");
welcomeUser.innerText = "Welcome " + user;

fetch("employees.json")
  .then(res => res.json())
  .then(data => {
    employees = data;
    showEmployee(0);
  });

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

function logout() {
  window.location.href = "../auth/index.html";
}
