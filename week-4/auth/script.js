let isLogin = false;

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Register";
  document.getElementById("name").style.display = isLogin ? "none" : "block";

  if (isLogin) {
   
    document.getElementById("toggle").innerHTML = `
      <span style="color:black">New user? </span>
      <span style="color:blue; cursor:pointer">Register</span>
    `;
  } else {
   
    document.getElementById("toggle").innerHTML = `
      <span style="color:black">Already user? </span>
      <span style="color:blue; cursor:pointer">Login</span>
    `;
  }

  clearInputs();
}

function handleAuth() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return alert("Invalid Email");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!isLogin) {
    if (!name || !email || !password) return alert("Fill all fields");

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
    toggleForm();
  } else {
    let user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert("Invalid Login");

    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "../quiz/index.html";
  }
}