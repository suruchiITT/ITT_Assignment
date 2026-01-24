let questions = [];
let index = 0;
let score = 0;
let timer = 10;
let interval;
let selected = null;

fetch("question.json")
  .then(res => res.json())
  .then(data => {
    questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    loadQuestion();
    loadLeaderboard();
  });

function loadQuestion() {
  clearInterval(interval);
  timer = 10;
  selected = null;

  document.getElementById("timer").innerText = timer;
  document.getElementById("qNo").innerText = `Question ${index + 1} / ${questions.length}`;
  document.getElementById("question").innerText = questions[index].question;

  let box = document.getElementById("options");
  box.innerHTML = "";

  questions[index].options.forEach(opt => {
    if (!opt) return;

    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => select(btn, opt);
    box.appendChild(btn);
  });

  interval = setInterval(() => {
    document.getElementById("timer").innerText = timer;
    timer--;

    if (timer < 0) {
      clearInterval(interval);
      next();
    }
  }, 1000);
}

function select(btn, opt) {
  if (selected) return;
  selected = opt;

  let correct = questions[index].correctAnswer;

  document.querySelectorAll("#options button").forEach(b => {
    if (b.innerText === correct) b.classList.add("correct");
    if (b.innerText === opt && opt !== correct) b.classList.add("wrong");
  });

  if (opt === correct) score++;
}

function next() {
  index++;
  if (index >= questions.length) return finish();
  loadQuestion();
}

function finish() {
  document.getElementById("scoreBox").innerText = "Your Score: " + score;

  let user = JSON.parse(localStorage.getItem("currentUser"));
  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

  board = board.filter(b => b.email !== user.email);
  board.push({ name: user.name, email: user.email, score });

  board.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(board));

  loadLeaderboard();
}

function loadLeaderboard() {
  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let ul = document.getElementById("leaders");
  ul.innerHTML = "";

  board.forEach(b => {
    let li = document.createElement("li");
    li.innerText = `${b.name} - ${b.score}`;
    ul.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "../auth/index.html";
}
