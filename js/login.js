"use strict";

const users = {
    user1: {
        fullName: "Diana Pasos",
        id: "1-1623-1245",
        userName: "dpasoss",
        password: "sm123"
    },
    user2: {
        fullName: "Roberto Rojas",
        id: "1-1290-2346",
        userName: "rrojasj",
        password: "sm123"
    },
    user3: {
        fullName: "Jason Corrales",
        id: "1-1234-5678",
        userName: "jcorrales",
        password: "sm123"
    }
}

// const user1 = {
//     fullName: "Diana Pasos",
//     id: "1-1623-1245",
//     userName: "dpasoss",
//     password: "sm123"
// }

// const user2 = {
//     fullName: "Roberto Rojas",
//     id: "1-1290-2346",
//     userName: "rrojasj",
//     password: "sm123"
// }

// const user3 = {
//     fullName: "Jason Corrales",
//     id: "1-1234-5678",
//     userName: "jcorrales",
//     password: "sm123"
// }

const loginForm = document.getElementById('login-form');

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("users", JSON.stringify(users));
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputUsername = document.getElementById("input-username");
    const inputPassword = document.getElementById("input-pswd");

    const isValid = validateRequiredInputs(inputUsername, inputPassword);

    if (isValid) {
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users[inputUsername.value];
        if (user) {
            if (user.password === inputPassword.value) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "home.html";
            } else {
                inputPassword.classList.add('error-input');
                document.getElementById('error-msg-pswd').textContent = 'contraseña incorrecta';
            }
        } else {
            inputUsername.classList.add('error-input');
            document.getElementById('error-msg-username').textContent = 'usuario no encontrado';
        }
    }

});

function validateRequiredInputs(inputUsername, inputPassword) {
    let allValid = true;

    const requiredUserMsg = document.getElementById('error-msg-username');
    const requiredPswdMsg = document.getElementById('error-msg-pswd');

    if (inputUsername.value === '') {
        inputUsername.classList.add('error-input');
        requiredUserMsg.textContent = 'campo requerido *';
        allValid = false;
    } else {
        inputUsername.classList.remove('error-input');
        requiredUserMsg.textContent = '';
    }
    if (inputPassword.value === '') {
        inputPassword.classList.add('error-input');
        requiredPswdMsg.textContent = 'campo requerido *';
        allValid = false;
    }
    return allValid;
}

function validateUser(user, pswd) {

}







