const btn = document.querySelector("button");
const nameBox = document.getElementById("nameBox");
const box = document.getElementById("box");
const course = document.querySelector("select");
const form = document.querySelector("form");

btn.addEventListener("click", function () {
    alert("Button clicked");
});

nameBox.addEventListener("keyup", function () {
    document.getElementById("nameResult").innerHTML = nameBox.value;
});

nameBox.addEventListener("focus", function () {
    nameBox.style.background = "#eef";
});

nameBox.addEventListener("blur", function () {
    nameBox.style.background = "white";
});

box.addEventListener("mouseenter", function () {
    box.style.backgroundColor = "orange";
});

box.addEventListener("mouseleave", function () {
    box.style.backgroundColor = "lightblue";
});

course.addEventListener("change", function () {
    document.getElementById("courseResult").innerHTML =
        "Course: " + course.value;
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter city");
    } else {
        document.getElementById("formResult").innerHTML =
            "City: " + city;
    }
});

