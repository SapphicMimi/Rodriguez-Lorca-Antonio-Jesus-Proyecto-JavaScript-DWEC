/* Variables donde van almacenados los contenedores de Login y Registro */
let login = document.getElementById("login");
let register = document.getElementById("register");

/* Variables de los Inputs del Registro */
let nameR = document.getElementById("name");
let surname = document.getElementById("surname");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let dni = document.getElementById("dni");
let age = document.getElementById("age");
let buttonRegister = document.getElementById("registerButton");

let messageComplete = document.getElementById("complete");

/* Variable para el mensaje de error */
let registerMessage = document.getElementById("errorRegister");
let loginMessage = document.getElementById("errorLogin");

/* Regex para validar los campos */
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
let regexDNI = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

/* Boolean para confirmar que todos los campos estan correctos */
let correct = false;

/* URL */
const URL_users = "https://fakestoreapi.com/users";

/* Cambiar vistas */
/* Cambiar la vista de Login a Registro */
document.getElementById("changeRegister").addEventListener("click", () => {
    login.classList.remove("login");
    login.classList.add("hidden");

    register.classList.remove("hidden");
    register.classList.add("register");

    messageComplete.textContent = "";
})

/* Cambiar la vista de Registro a Login */
document.getElementById("changeLogin").addEventListener("click", () => {
    register.classList.remove("register");
    register.classList.add("hidden");

    login.classList.remove("hidden");
    login.classList.add("login");

    messageComplete.textContent = "";
})

/* Registro */
/* -------------------------------------------------------------------------------------- */
/* Desactivo todos los campos del registro, menos el primero, para ir comprobandose todos */
surname.disabled = true;
email.disabled = true;
pass.disabled = true;
dni.disabled = true;
age.disabled = true;

/* --- Validación --- */
/* Validar nombre */
nameR.addEventListener("input", () => {
    if(nameR.value.length < 2 || nameR.value.length == "") {
        registerMessage.textContent = "Su nombre tiene que tener como mínimo 2 caracteres, o no estar vacío.";
        nameR.setCustomValidity("Su nombre tiene que tener como mínimo 2 caracteres, o no estar vacío.");

        /* Vuelvo a desactivar los demas campos, por si lo vuelve a introducir mal */
        surname.disabled = true;
        email.disabled = true;
        pass.disabled = true;
        dni.disabled = true;
        age.disabled = true;
    } else {
        registerMessage.textContent = "";
        nameR.setCustomValidity("");

        /* Activo el siguiente campo */
        surname.disabled = false;
    }
})

/* Validar Apellido */
surname.addEventListener("input", () => {
    if(surname.value.length < 8 || surname.value.length == "") {
        registerMessage.textContent = "Su apellido tiene que tener como mínimo 8 caracteres, o no estar vacío.";
        surname.setCustomValidity("Su apellido tiene que tener como mínimo 8 caracteres, o no estar vacío.");

        /* Vuelvo a desactivar los demas campos, por si lo vuelve a introducir mal */
        email.disabled = true;
        pass.disabled = true;
        dni.disabled = true;
        age.disabled = true;
    } else {
        registerMessage.textContent = "";
        surname.setCustomValidity("");

        /* Activo el siguiente campo */
        email.disabled = false;
    }
})

/* Validar Correo */
email.addEventListener("input", () => {
    if(!regexEmail.test(email.value) || email.value.length == "") {
        registerMessage.textContent = "El correo introducido esta incorrecto, o esta vacío.";
        email.setCustomValidity("El correo introducido esta incorrecto, o esta vacío.");

        /* Vuelvo a desactivar los demas campos, por si lo vuelve a introducir mal */
        pass.disabled = true;
        dni.disabled = true;
        age.disabled = true;
    } else {
        registerMessage.textContent = "";
        email.setCustomValidity("");

        /* Activo el siguiente campo */
        pass.disabled = false;
    }
})

/* Validar Contraseña */
pass.addEventListener("input", () => {
    if(!regexPass.test(pass.value) || pass.value.length == "") {
        registerMessage.textContent = "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minuscula, y al menos una mayúscula.";
        pass.setCustomValidity("La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minuscula, y al menos una mayúscula.");

        /* Vuelvo a desactivar los demas campos, por si lo vuelve a introducir mal */
        dni.disabled = true;
        age.disabled = true;
    } else {
        registerMessage.textContent = "";
        pass.setCustomValidity("");

        /* Activo el siguiente campo */
        dni.disabled = false;
    }
})

/* Validar DNI */
dni.addEventListener("input", () => {
    if(!regexDNI.test(dni.value) || dni.value.length == "") {
        registerMessage.textContent = "El DNI introducido no es correcto, o esta vacío.";
        dni.setCustomValidity("El DNI introducido no es correcto, o esta vacío.");

        /* Vuelvo a desactivar los demas campos, por si lo vuelve a introducir mal */
        age.disabled = true;
    } else {
        registerMessage.textContent = "";
        dni.setCustomValidity("");

        /* Activo el siguiente campo */
        age.disabled = false;
    }
})

/* Validar Edad */
age.addEventListener("input", () => {
    if(age.value.length == "") {
        registerMessage.textContent = "Introduzca una edad.";
        age.setCustomValidity("Introduzca una edad.");
    } else {
        registerMessage.textContent = "";
        age.setCustomValidity("");

        correct = true;
    }
})

/* Una vez los datos validados, podremos registrar los datos */
buttonRegister.addEventListener("click", (event) =>  {
    event.preventDefault();

    if(correct) {
        let user = {
            name_u : nameR.value,
            surname : surname.value,
            email : email.value,
            pass : pass.value,
            dni : dni.value,
            age : age.value,
            fav: [],
            cart: []
        };

        localStorage.setItem(nameR.value, JSON.stringify(user));
        messageComplete.textContent = "!Usuario "+nameR.value+", creado con éxito!"
    } else {
        registerMessage.textContent = "Introduzca todos los datos antes de registrarse.";
    }
})
/* -------------------------------------------------------------------------------------- */

/* Inicio de Sesión */
/* -------------------------------------------------------------------------------------- */
function localUsers(name, pass) {
    let user = JSON.parse(localStorage.getItem(name));

    if(user == null) {
        return false;
    }

    if(user.name_u == name && user.pass == pass) {
        return true;
    } else {
        return false;
    }
}

/*


function onlineUsers(name, pass) {
    users.forEach(user => {
        if(user.username == name && user.password == pass) {
            console.log("yippe");
        } else {
            console.log("not yippe");
        }
    })
}
*/

async function downloadUsers() {
        let usersD;

        const res = await fetch(URL_users);
        usersD = await res.json();

        return usersD;
}

function onlineUsers(name, pass) {
    const users = downloadUsers();

    let result;

    users.then((users) => {
        users.forEach(user => {
            if(user.username == "johnd" && user.password == "m38rmF$") {
                result = "truers";
            }
        })
    })

    return result;
}
console.log(onlineUsers("johnd", "m38rmF$"));

/* "johnd", "m38rmF$" */

loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    if(localUsers(user.value, userPass.value)) {
        let fav = [];
        let cart = [];

        /* Compruebo si el usuario es local de nuevo, para obtener sus productos y carrito. */
        if(localUsers(user.value, userPass.value)) {
            fav = JSON.parse(localStorage.getItem(user.value)).fav;
            cart = JSON.parse(localStorage.getItem(user.value)).cart;
        }

        /* Creo la sesión */
        let sesion = {
            user : user.value,
            fav : fav,
            cart : cart
        }

        localStorage.setItem("sesion", JSON.stringify(sesion));
    } else {
        loginMessage.textContent = "Usuario o contraseña equivocados."
    }
})
/* -------------------------------------------------------------------------------------- */