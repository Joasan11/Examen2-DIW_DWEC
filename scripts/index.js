/* Variables principales del cajero */
let saldo = 1000;
const PIN_CORRECTO = "1234";
let intentosRestantes = 3;

/* Funcion para mostrar el saldo actualizado y con 2 decimales */
function mostrarSaldo() {
    document.getElementById("saldo").textContent = saldo.toFixed(2);
}

/* Funcion para depositar saldo a la cuenta */
function depositar() {
    const deposito = parseFloat(document.getElementById("amount").value);
    if (isNaN(deposito) || deposito <= 0) {
        alert("Cantidad inválida. Inténtalo de nuevo");
    } else {
        saldo += deposito;
        alert(`Se han depositado ${deposito.toFixed(2)} €`);
        mostrarSaldo();
    }
}

/* Funcion para retirar saldo a la cuenta */
function retirar() {
    const retiro = parseFloat(document.getElementById("amount").value);
    if (isNaN(retiro) || retiro <= 0 || retiro > saldo) {
        alert("Cantidad inválida. Inténtalo de nuevo");
    } else {
        saldo -= retiro;
        alert(`Se han retirado ${retiro.toFixed(2)} €`);
        mostrarSaldo();
    }
}

/* Funcion para transferir saldo a la cuenta */
function transferir() {
    const transferencia = parseFloat(document.getElementById("amount").value);
    if (isNaN(transferencia) || transferencia <= 0 || transferencia > saldo) {
        alert("Cantidad inválida. Inténtalo de nuevo");
    } else {
        const cuentaDestino = prompt("¿A qué cuenta quieres mandar el dinero?");
        /* Comprobamos si la cuenta es correcta */
        if (validarIBAN(cuentaDestino)) {
            saldo -= transferencia;
            alert(`Has enviado ${transferencia.toFixed(2)} € a ${cuentaDestino}`);
            mostrarSaldo();
        } else {
            alert("La cuenta bancaria ingresada no es válida. La transferencia no se ha realizado.");
        }
    }
}

/* Funcion para validar la cuenta a la que vamos a hacer la transferencia, a traves de una expresion regular */
function validarIBAN(iban){
    let expresionregular = /^(ES\d{22})$/;
    return expresionregular.test(iban);
}

/* Funcion para iniciar sesion a traves del pin*/
function iniciarSesion() {
    let pin = document.getElementById("pin").value;
    if (pin === PIN_CORRECTO) {
        alert("Has iniciado sesión correctamente");
        mostrarSaldo();
        document.getElementById("login-form").style.display = "none";
        document.getElementById("account-info").style.display = "block";
    } else {
        intentosRestantes--;
        alert(`PIN incorrecto, le quedan ${intentosRestantes} intentos`);
        if (intentosRestantes === 0) {
            alert("PIN incorrecto. Se han agotado los intentos.");
            // Redirigir a la página de bloqueo
            window.location.href = "templates/cajeroBloqueado.html";
        }
    }
}

/* Funcion para cerrar sesion */
function cerrarSesion() {
    document.getElementById("account-info").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("pin").value = "";
    intentosRestantes = 3;
}

/* Funcion para cambiar contraseña */
function cambiarContrasena(){
    let nuevoPIN;
    nuevoPIN = 12;
    PIN_CORRECTO = nuevoPIN
    alert(`El pin se ha cambiado correctamente, a: ${PIN_CORRECTO}`);
}