"use strict";

// const users = {
//     user1: {
//         fullName: "Diana Pasos",
//         id: "1-1623-1245",
//         userName: "dpasoss",
//         password: "sm123"
//     },
//     user2: {
//         fullName: "Roberto Rojas",
//         id: "1-1290-2346",
//         userName: "rrojasj",
//         password: "sm123"
//     },
//     user3: {
//         fullName: "Jason Corrales",
//         id: "1-1234-5678",
//         userName: "jcorrales",
//         password: "sm123"
//     }
// }

const adminUser = {
    fullName: "SmartKey",
    id: "SM-01",
    userName: "sm-user",
    password: "sm123",
    licenciasRegistradas: []
}

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
    localStorage.setItem("adminUser", JSON.stringify(adminUser));
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputUsername = document.getElementById("input-username");
    const inputPassword = document.getElementById("input-pswd");

    const isValid = validateRequiredInputs(inputUsername, inputPassword);

    if (isValid) {
        const lsUser = JSON.parse(localStorage.getItem("adminUser"));
        const userName = lsUser.userName;
        const userPswd = lsUser.password;

        if (userName === inputUsername.value && userPswd === inputPassword.value) {
            localStorage.setItem("currentUser", JSON.stringify(lsUser));
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                title: 'Bienvenido',
                html: '¡Inicio de sesión exitoso!',
                didOpen: () => {
                    Swal.getIcon().style.webkitAnimation = 'rotate 2s linear infinite';
                    Swal.getIcon().style.animation = 'rotate 2s linear infinite';
                },
                customClass: {
                    title: 'quick-form-alert-title'
                }
            }).then(() => {
                window.location.href = "index.html";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos.',
                customClass: {
                    confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
                }
            });
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
    } else if (inputPassword.value === '') {
        inputPassword.classList.add('error-input');
        requiredPswdMsg.textContent = 'campo requerido *';
        allValid = false;
    } else {
        inputUsername.classList.remove('error-input');
        requiredUserMsg.textContent = '';
    }

    if (!allValid) {
        Swal.fire({
            icon: 'warning',
            title: 'Información',
            text: 'Por favor, complete todos los campos requeridos.',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
    }
    
    return allValid;
}

function validateUser(user, pswd) {

}







