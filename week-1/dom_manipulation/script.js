const heading = document.getElementById("heading");
const text = document.getElementById("text");
const inputBox = document.getElementById("inputBox");

const changeTextBtn = document.getElementById("changeTextBtn");
const addTextBtn = document.getElementById("addTextBtn");
const deleteTextBtn = document.getElementById("deleteTextBtn");

const addTagBtn = document.getElementById("addTagBtn");
const removeTagBtn = document.getElementById("removeTagBtn");

const colorBtn = document.getElementById("colorBtn");
const hideBtn = document.getElementById("hideBtn");
const showBtn = document.getElementById("showBtn");

const container = document.getElementById("container");

changeTextBtn.addEventListener("click", function () {
    const val = inputBox.value;
    if (val !== "") {
        text.innerText = val;
    }
});

addTextBtn.addEventListener("click", function () {
    const val = inputBox.value;
    if (val !== "") {
        text.innerText = text.innerText + " " + val;
    }
});

deleteTextBtn.addEventListener("click", function () {
    text.innerText = "";
});

addTagBtn.addEventListener("click", function () {
    const val = inputBox.value;
    if (val !== "") {
        const p = document.createElement("p");
        p.innerText = val;
        container.appendChild(p);
    }
});

removeTagBtn.addEventListener("click", function () {
    if (container.lastChild) {
        container.removeChild(container.lastChild);
    }
});

hideBtn.addEventListener("click", function () {
    text.style.display = "none";
});

showBtn.addEventListener("click", function () {
    text.style.display = "block";
});

colorBtn.addEventListener("click", function () {
    text.style.display = "block";
    text.style.color = "red";
    heading.style.color = "green";
});
