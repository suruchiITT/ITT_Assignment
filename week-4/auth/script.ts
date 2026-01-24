export { };

let isLogin: boolean = false;

const toggle = document.getElementById("toggle") as HTMLElement;
const btn = document.getElementById("submitBtn") as HTMLElement;
const nameInput = document.getElementById("name") as HTMLInputElement;

toggle.addEventListener("click", toggleForm);
btn.addEventListener("click", handleAuth);

function toggleForm(): void {
  isLogin = !isLogin;

  (document.getElementById("title") as HTMLElement).innerText = isLogin ? "Login" : "Register";
  nameInput.style.display = isLogin ? "none" : "block";

  if (isLogin) {

    toggle.innerHTML = `
      <span style="color:black">New user? </span>
      <span style="color:blue; cursor:pointer">Register</span>
    `;
  } else {

    toggle.innerHTML = `
      <span style="color:black">Already user? </span>
      <span style="color:blue; cursor:pointer">Login</span>
    `;
  }
}


function handleAuth(): void {
  let name = nameInput.value;
  let email = (document.getElementById("email") as HTMLInputElement).value;
  let password = (document.getElementById("password") as HTMLInputElement).value;
  let msg = document.getElementById("msg") as HTMLElement;

  let emailRegex = /^\S+@\S+\.\S+$/;
  let passRegex = /^(?=.*[0-9]).{6,}$/;

  if (!emailRegex.test(email)) return void (msg.innerText = "Invalid Email");
  if (!passRegex.test(password)) return void (msg.innerText = "Password must contain number & 6 chars");

  let users: any[] = JSON.parse(localStorage.getItem("users") || "[]");

  if (!isLogin) {
    users.push({ name, email, password, score: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    msg.innerText = "Registered Successfully!";
  } else {
    let user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.href = "../quiz/index.html";
    } else msg.innerText = "Invalid Login!";
  }
}
