let registerBtn = document.querySelector('.registerbtn');
let signInBtn = document.querySelector('.signinbtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('.title');
let underline = document.querySelector('.underline');

let isLogin = false;

signInBtn.addEventListener('click', () => {
    if (!isLogin) {
        isLogin = true;
        nameField.style.maxHeight = '0';
        title.innerHTML = 'Sign In';
        registerBtn.classList.add('disable');
        signInBtn.classList.remove('disable');
        underline.style.transform = 'translateX(35px)';
        return;
    }

    let emailVal = document.getElementById("email").value.trim();
    let passVal = document.getElementById("password").value.trim();

    if (!emailVal || !passVal) {
        alert("Please enter email and password");
        return;
    }

    let se = localStorage.getItem("email");
    let sp = localStorage.getItem("password");

    if (emailVal === se && passVal === sp) {
        window.location = "../gallery/index.html";
    } else {
        alert("Invalid Email or Password");
    }
});


registerBtn.addEventListener('click', () => {

    if (isLogin) {
        isLogin = false;
        nameField.style.maxHeight = '60px';
        title.innerHTML = 'Register';
        signInBtn.classList.add('disable');
        registerBtn.classList.remove('disable');
        underline.style.transform = 'translateX(0)';
        return;
    }


    let nameVal = document.getElementById("name").value.trim();
    let emailVal = document.getElementById("email").value.trim();
    let passVal = document.getElementById("password").value.trim();

    if (!nameVal || !emailVal || !passVal) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("name", nameVal);
    localStorage.setItem("email", emailVal);
    localStorage.setItem("password", passVal);

    alert("Registered Successfully. Now Sign In");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";


    isLogin = true;
    nameField.style.maxHeight = '0';
    title.innerHTML = 'Sign In';
    registerBtn.classList.add('disable');
    signInBtn.classList.remove('disable');
    underline.style.transform = 'translateX(35px)';
});
