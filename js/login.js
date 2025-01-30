"use strict";

const user1 = {
    fullName: "Diana Pasos",
    id: "1-1623-1245",
    userName: "dpasoss",
    password: "sm123"
}

const user2 = {
    fullName: "Roberto Rojas",
    id: "1-1290-2346",
    userName: "rrojasj",
    password: "sm123"
}

const user3 = {
    fullName: "Jason Corrales",
    id: "1-1234-5678",
    userName: "jcorrales",
    password: "sm123"
}

const loginForm = document.getElementById('login-form');

document.addEventListener("DOMContentLoaded", () => {

    localStorage.setItem("user1", JSON.stringify(user1));
    localStorage.setItem("user2", JSON.stringify(user2));
    localStorage.setItem("user3", JSON.stringify(user3));

    // const loginForm = document.getElementById("loginForm");
    // loginForm.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     const userName = document.getElementById("userName").value;
    //     const password = document.getElementById("password").value;

    //     const users = [user1, user2, user3];
    //     const user = users.find((user) => user.userName === userName && user.password === password);

    //     if (user) {
    //         localStorage.setItem("currentUser", JSON.stringify(user));
    //         window.location.href = "home.html";
    //     } else {
    //         alert("Usuario o contraseña incorrectos");
    //     }
    // });
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = document.getElementById("input-username").value;
    const userPswd = document.getElementById("input-pswd").value;


});

function validateLoginInputs() {
    let allValid = true;

    const loginFields = [
        {id: 'input-username', name: 'username'},
        {id: 'input-pswd', name: 'password'}
    ];

    loginFields.forEach((field, index) => {
        const input = document.getElementById(field.id);
        const inputValue = input?.value.trim();

        if(!input) {
            console.error(`El elemento con el ID '${field.id}' no ha sido encontrado`);
            allValid = false;
            return;
        }
    
        if (inputValue === '') {}
    });


    

    
}







