export {};

let questions: any[] = [];
let index: number = 0;
let score: number = 0;
let timer: number = 10;
let interval: any;

(document.getElementById("nextBtn") as HTMLElement)
  .addEventListener("click", nextQuestion);

fetch("./question.json")
  .then(res => res.json())
  .then(data => {
    (document.getElementById("title") as HTMLElement).innerText = data.quizTitle;
    questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    loadQuestion();
  });

function loadQuestion(): void {
  clearInterval(interval);
  timer = 10;
  (document.getElementById("timer") as HTMLElement).innerText = timer.toString();

  (document.getElementById("counter") as HTMLElement).innerText =
    `Question ${index + 1} / ${questions.length}`;

  interval = setInterval(() => {
    timer--;
    (document.getElementById("timer") as HTMLElement).innerText = timer.toString();
    if (timer === 0) nextQuestion();
  }, 1000);

  let q = questions[index];
  (document.getElementById("question") as HTMLElement).innerText = q.question;

  let html: string = "";
  q.options.forEach((opt: string) => {
    html += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
  });

  (document.getElementById("options") as HTMLElement).innerHTML = html;
}

function checkAnswer(ans: string): void {
  if (ans === questions[index].correctAnswer) score++;
}

function nextQuestion(): void {
  index++;
  if (index < questions.length) loadQuestion();
  else finishQuiz();
}

function finishQuiz(): void {
  clearInterval(interval);

  let user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  user.score = score;
  users = users.map((u:any) => u.email === user.email ? user : u);

  localStorage.setItem("users", JSON.stringify(users));

  (document.getElementById("score") as HTMLElement).innerText = "Your Score: " + score;
  loadBoard();
}

function loadBoard(): void {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.sort((a:any,b:any)=>b.score-a.score);

  let html: string = "";
  users.forEach((u:any) => html += `<li>${u.name} - ${u.score}</li>`);

  (document.getElementById("board") as HTMLElement).innerHTML = html;
}

function logout(): void {
  location.href = "../auth/index.html";
}
