/* Obtengo la sesion. No compruebo si tengo la sesión, debido a que solo puedo acceder si tengo al sesion abierta, ya que boton no aparecerá si no la tienes */
let sesion = JSON.parse(localStorage.getItem("sesion"));

/* Seccion por los botones del Header */
let header_sesion = document.getElementById("sesion");

/* Secciones a ocultar o mostrar */
let p = document.getElementById("empty");
let button_shopping = document.getElementById("shopping")

/* Seccion donde se van a incluir los productos */
let ul = document.getElementById("ul-cart");

let realize_shop = document.getElementById("shopping");

/* URL */
let URL_prod = "https://fakestoreapi.com/products";

/* Funciones a Ejecutar */
hideAndShow();
showProducts();

/* Vacio el Header para solo dejar botón de volver y que usuario ha iniciado sesion */
header_sesion.innerHTML = "";

/* Creo los botones y los inserto */
let header_button = createBackButton();
let header_user = createUserLogged();

header_sesion.appendChild(header_user);
header_sesion.appendChild(header_button);

/* Funcion para crear el botón para volver y el usuario conectado */
function createBackButton() {
    let header_button_back = document.createElement("a");

    header_button_back.classList.add("header-button");
    header_button_back.textContent = "Volver al Inicio";

    header_button_back.addEventListener("click", () => {
        window.location.href = "../index.html";
    })

    return header_button_back;
}

function createUserLogged() {
    let header_user = document.createElement("a");

    header_user.classList.add("header-button");
    header_user.textContent = "Bienvenido " + sesion.user;

    return header_user;
}

/* Muestro o oculto elementos segun sean necesarios, como ocultar el botón de comprar cuando no hay productos. */
function hideAndShow() {
    if(sesion.cart.length > 0) {
        p.classList.add("hidden");
        button_shopping.classList.remove("hidden");
    } else {
        p.classList.remove("hidden");
        button_shopping.classList.add("hidden");
    }
}

/* Funciones para descargar, mostrar y crear los productos en el carrito */
/* ------------------------------------------------------------------------- */
/* Recorro el carrito, generando uno a uno */
function showProducts() {
    if(sesion.cart.length > 0) {
        sesion.cart.forEach(id => {
            downloadProduct(id);
        })
    } 
}

/* Me descargo el producto */
function downloadProduct(id) {
    fetch(URL_prod + "/" + id)
        .then(res=>res.json())
        .then(product=>createLi(product));
}

/* Con esta funcion creo el producto entero, con su botones */
function createLi(product) {
    let li = document.createElement("li");
    let i = document.createElement("i");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let h4_hidden = document.createElement("h4");
    let div = createDivButtons(product.id, product.price);

    i.classList.add("bx");
    i.classList.add("bx-no-entry");
    h4_hidden.classList.add("hidden");

    i.id = "delete";
    h4_hidden.id = "price_hidden-"+product.id;
    h4.id = "price-"+product.id;

    img.src = product.image;

    h3.textContent = product.title;
    h4.textContent = product.price + " €";
    h4_hidden.textContent = product.price;

    i.addEventListener("click", () => {
        let index = sesion.cart.indexOf(product.id);

        sesion.cart.splice(index, 1);
        localStorage.setItem("sesion", JSON.stringify(sesion));

        alert("Producto " + product.title + " eliminado del carrito.");

        location.reload();
    })

    li.appendChild(i);
    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(h4);
    li.appendChild(h4_hidden);
    li.appendChild(div);

    ul.appendChild(li);
}

/* Funcion para crear los botones para aumentar o disminuir la cantidad de productos a comprar */
function createDivButtons(id, priceProd) {
    let div = document.createElement("div");
    let more = document.createElement("button");
    let i_more = document.createElement("i");
    let p = document.createElement("p");
    let less = document.createElement("button");
    let i_less = document.createElement("i");

    more.id = "more";
    i_more.classList.add("bx");
    i_more.classList.add("bx-plus");

    p.id = "quantity-"+id;

    less.id = "less";
    i_less.classList.add("bx");
    i_less.classList.add("bx-minus");

    p.textContent = 1;

    /* Le doy la propiedad, de que cada vez que clico el boton con el simbolo más, aumenta la cantidad de productos, y el precio total del producto. */
    more.addEventListener("click", () => {
        let quantity = parseInt(document.getElementById("quantity-"+id).textContent);
        let price_raw = parseFloat(document.getElementById("price_hidden-"+id).textContent);
        let price = Math.round(price_raw * 100) / 100;

        quantity++;
        price += priceProd;

        document.getElementById("quantity-"+id).textContent = quantity;
        document.getElementById("price_hidden-"+id).textContent = price;
        document.getElementById("price-"+id).textContent = price + " €";
    })

     /* Le doy la propiedad, de que cada vez que clico el boton con el simbolo menos, disminuye la cantidad de productos, y el precio total del producto. */
    less.addEventListener("click", () => {
        let quantity = parseInt(document.getElementById("quantity-"+id).textContent);
        let price_raw = parseFloat(document.getElementById("price_hidden-"+id).textContent);
        let price = Math.round(price_raw * 100) / 100;

        if(quantity != 1) {
            quantity--;
            price -= priceProd;

            document.getElementById("quantity-"+id).textContent = quantity;
            document.getElementById("price_hidden-"+id).textContent = price;
            document.getElementById("price-"+id).textContent = price + " €";
        }
    })

    more.appendChild(i_more);
    less.appendChild(i_less);

    div.appendChild(more);
    div.appendChild(p);
    div.appendChild(less);

    return div;
}
/* ------------------------------------------------------------------------- */

realize_shop.addEventListener("click", () => {
    sesion.cart = [];
    
    localStorage.setItem("sesion", JSON.stringify(sesion));

    alert("¡Se ha realizado su compra!");

    location.reload();
})