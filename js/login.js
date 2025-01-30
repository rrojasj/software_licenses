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
})



