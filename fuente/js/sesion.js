/* Variables */
let HTML_sesion = document.getElementById("sesion");
let sesion;

/* Sesion */
checkSesion();

/* Comprobar la Sesión */
function checkSesion() {
    sesion = JSON.parse(localStorage.getItem("sesion"));

    if(sesion) {
        createButtonsSesion();
    } else {
        createButtonLogin();
    }
}

/* Cerrar la Sesión */
function closeSesion() {
    let userStorage = JSON.parse(localStorage.getItem(sesion.user));

    if(userStorage) {
        userStorage.cart = [...sesion.cart];
        userStorage.fav = [...sesion.fav];
        userStorage.like = [...sesion.like];
        userStorage.dislike = [...sesion.dislike];

        localStorage.setItem(sesion.user, JSON.stringify(userStorage));
    }

    localStorage.removeItem("sesion");
    sesion = "";

    alert("Se va a cerrar la seseión... !Hasta pronto!");

    location.reload();
}

/* Funciones para crear botones del Header */
/* Boton Inicio de Sesión */
function createButtonLogin() {
    HTML_sesion.innerHTML = " ";

    let a = document.createElement("a");

    a.classList.add("header-button");
    a.textContent = "Iniciar Sesión";

    a.addEventListener("click", () => {
        window.location.href = "html/login-register.html"; 
    })

    HTML_sesion.appendChild(a);
}

/* Botones de Carrito y Cerrar Sesión */
function createButtonsSesion() {
    HTML_sesion.innerHTML = " ";

    let a_1 = document.createElement("a");
    let a_2 = document.createElement("a");
    let a_3 = document.createElement("a");

    a_1.classList.add("header-button");
    a_2.classList.add("header-button");
    a_3.classList.add("header-button");

    a_1.id = "header-button-cart";
    a_2.id = "close-sesion"

    a_1.textContent = "Carrito";
    a_2.textContent = "Cerrar Sesión";
    a_3.textContent = "Bienvenido " + sesion.user;

    a_2.addEventListener("click", () => {
        closeSesion()
    })

    a_1.addEventListener("click", () => {
        window.location.href = "html/carrito.html";
    })

    HTML_sesion.appendChild(a_3);
    HTML_sesion.appendChild(a_1);
    HTML_sesion.appendChild(a_2);
}

/* Funcion para crear el botón para volver para el carrito */
function createBackButton() {
    let header_button_back = document.createElement("a");

    header_button_back.classList.add("header-button");
    header_button_back.textContent = "Volver al Inicio";

    header_button_back.addEventListener("click", () => {
        window.location.href = "../index.html";
    })

    return header_button_back;
}