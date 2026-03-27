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

    let emailVal = document.getElementById("email").value.trim().toLowerCase();
    let passVal = document.getElementById("password").value.trim();

    if (!emailVal || !passVal) {
        alert("Please enter email and password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(u => u.email === emailVal && u.password === passVal);

    if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));
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
    let emailVal = document.getElementById("email").value.trim().toLowerCase();
    let passVal = document.getElementById("password").value.trim();

    if (!nameVal || !emailVal || !passVal) {
        alert("Fill all fields");
        return;
    }

     let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(u => u.email === emailVal);

    if (userExists) {
        alert("User already registered");
        return;
    }

    users.push({
        name: nameVal,
        email: emailVal,
        password: passVal
    });

    localStorage.setItem("users", JSON.stringify(users));

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
