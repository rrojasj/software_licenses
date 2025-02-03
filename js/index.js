document.addEventListener("DOMContentLoaded", function () {
    const licencias = ["Seleccione...", "Microsoft Office", "Adobe Photoshop", "AutoCAD"];
    localStorage.setItem("licencias", JSON.stringify(licencias));
    const tipoLicencias = ["Seleccione...", "Individual", "Familiar", "Empresarial"];
    localStorage.setItem("tipoLicencias", JSON.stringify(tipoLicencias));
    cargarLicencias();
    cargarTiposLicencias();
    cargarInfoUsuarioActual();

});

// const licenciasSeleccionadas = document.getElementById("licenciasSeleccionadas");
const agregarBtn = document.getElementById("agregarBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const logoutBtn = document.getElementById("logoutBtn");
const comprarBtn = document.getElementById("comprarBtn");

function cargarInfoUsuarioActual() {
    const idElement = document.getElementById('idUsuario');
    const userNameElement = document.getElementById('nombreUsuario');
    const currentUserInfo = JSON.parse(localStorage.getItem("currentUser"));
    const idUsuario = currentUserInfo.id;
    const nombreUsuario = currentUserInfo.userName;

    idElement.textContent = idUsuario;
    userNameElement.textContent = nombreUsuario;
}

function cargarLicencias() {
    let listaLicenciasSelect = document.getElementById("listaLicencias");
    listaLicenciasSelect.innerHTML = "";

    // Retrieve and parse the stored data
    let licencias = JSON.parse(localStorage.getItem("licencias")) || [];

    licencias.forEach(licencia => {
        let option = document.createElement("option");
        option.value = licencia;
        option.textContent = licencia;
        listaLicenciasSelect.appendChild(option);
    });
}

function cargarTiposLicencias() {
    let tiposLicenciasSelect = document.getElementById("tipoLicencias");
    tiposLicenciasSelect.innerHTML = "";

    let tiposLicencias = JSON.parse(localStorage.getItem("tipoLicencias")) || [];

    tiposLicencias.forEach(licencia => {
        let option = document.createElement("option");
        option.value = licencia;
        option.textContent = licencia;
        tiposLicenciasSelect.appendChild(option);
    });
}

function validarSeleccionRequerida(nombreLicencia, tipoLicencia) {

    let isValid = true;

    if (nombreLicencia === 'Seleccione...' && tipoLicencia === 'Seleccione...') {
        Swal.fire({
            icon: 'warning',
            title: 'Alerta',
            text: 'Debe seleccionar un nombre y un tipo de licencia',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
        isValid = false;
    } if (nombreLicencia === 'Seleccione...' && tipoLicencia !== 'Seleccione...') {
        Swal.fire({
            icon: 'warning',
            title: 'Alerta',
            text: 'Debe seleccionar un nombre de licencia.',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
        isValid = false;
    } else if (nombreLicencia !== 'Seleccione...' && tipoLicencia === 'Seleccione...') {
        Swal.fire({
            icon: 'warning',
            title: 'Alerta',
            text: 'Debe seleccionar un tipo de licencia.',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
        isValid = false;
    }
    return isValid;
}

function agregarLicencia() {
    const nombreLicencia = document.getElementById('listaLicencias').value;
    const tipoLicencia = document.getElementById('tipoLicencias').value;
    let seleccionRequerida = true;

    seleccionRequerida = validarSeleccionRequerida(nombreLicencia, tipoLicencia);
    if(seleccionRequerida) {
        validarDuplicado(nombreLicencia, tipoLicencia);

    }
}

agregarBtn.addEventListener('click', function() {
    agregarLicencia();
});

function cargarLicenciasDesdeLocalStorage() {
    let tbody = document.getElementById("rs-table-body");
    tbody.innerHTML = ""; // Limpiar la tabla antes de cargar

    let licenciasGuardadas = JSON.parse(localStorage.getItem("licencias")) || [];

    licenciasGuardadas.forEach(licencia => {
        agregarFilaTabla(licencia.nombre, licencia.tipo);
    });
}

// Función para validar y guardar en Local Storage antes de agregar a la tabla
function validarDuplicado(nombreLicencia, tipoLicencia) {
    let licenciasGuardadas = JSON.parse(localStorage.getItem("licencias")) || [];
    
    // Verificar si ya existe la licencia
    let isDuplicate = licenciasGuardadas.some(lic => lic.nombre === nombreLicencia && lic.tipo === tipoLicencia);

    if (isDuplicate) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'No se pueden duplicar licencias en la compra.',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
        document.getElementById('listaLicencias').value = "Seleccione...";
        document.getElementById('tipoLicencias').value = "Seleccione...";
    } else {
        // Guardar en Local Storage
        licenciasGuardadas.push({ nombre: nombreLicencia, tipo: tipoLicencia });
        localStorage.setItem("licencias", JSON.stringify(licenciasGuardadas));

        // Agregar la fila a la tabla
        agregarFilaTabla(nombreLicencia, tipoLicencia);
        comprarBtn.classList.remove("disabled");

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Licencia agregada correctamente.',
            customClass: {
                confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
            }
        });
    }
}

// Función para agregar una fila a la tabla
function agregarFilaTabla(nombreLicencia, tipoLicencia) {
    let tbody = document.getElementById("rs-table-body");
    let newRow = tbody.insertRow();

    
    let cellLicencia = newRow.insertCell(0);
    let cellTipo = newRow.insertCell(1);
    let cellEliminar = newRow.insertCell(2);
    
    cellLicencia.textContent = nombreLicencia;
    cellTipo.textContent = tipoLicencia;
    
    // Botón de eliminar
    let eliminarBtn = document.createElement("button");
    eliminarBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");
    eliminarBtn.onclick = function () {
        eliminarLicencia(nombreLicencia, tipoLicencia);
        newRow.remove();
    };
    cellEliminar.appendChild(eliminarBtn);

    document.getElementById('listaLicencias').value = "Seleccione...";
    document.getElementById('tipoLicencias').value = "Seleccione...";
}

// Función para eliminar del Local Storage y actualizar la tabla
function eliminarLicencia(nombreLicencia, tipoLicencia) {
    let licenciasGuardadas = JSON.parse(localStorage.getItem("licencias")) || [];

    let nuevasLicencias = licenciasGuardadas.filter(lic => !(lic.nombre === nombreLicencia && lic.tipo === tipoLicencia));

    localStorage.setItem("licencias", JSON.stringify(nuevasLicencias));
}

logoutBtn.addEventListener('click', function() {
    Swal.fire({
        icon: 'success',
        title: 'Gracias por visitarnos',
        text: '¡Regresa pronto!',
        customClass: {
            confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
        }
    }).then(() => {
        localStorage.removeItem("currentUser"); 
        window.location.href = "login.html";
    });
});

comprarBtn.addEventListener('click', function() {
    // Trabajando en esto:
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // const idUsuario = currentUser.id;
    // const nombreUsuario = currentUser.userName;
    // const licencias = JSON.parse(localStorage.getItem("licencias")) || [];

    // const compra = {
    //     idUsuario: idUsuario,
    //     nombreUsuario: nombreUsuario,
    //     licencias: licencias
    // };

    // localStorage.setItem("compra", JSON.stringify(compra));
    // localStorage.removeItem("licencias");

    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: '¡Gracias por tu compra!',
        customClass: {
            confirmButton: 'custom-confirm-btn car-forms-btn car-actions-btn btn btn-outline-secondary'
        }
    }).then(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
});