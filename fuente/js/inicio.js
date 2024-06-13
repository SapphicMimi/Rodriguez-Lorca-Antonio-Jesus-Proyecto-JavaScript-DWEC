/* Variables */
/* URL Fake API */
const url_products = "https://fakestoreapi.com/products";
const url_categories = "https://fakestoreapi.com/products/categories";

/* Secciones */
let HTML_products = document.getElementById("products");
let HTML_categories = document.getElementById("categories");

/* Variables aparte */
let placement = "list";
let order = null;
let categorySelected = null;
let scrollActive = false;

/* Funciones */
/* Funciones A Cargarse */
downloadProducts();
downloadCategories();

/* Declaración de Funciones */
/* Descarga de todos los productos */
function downloadProducts() {
    if((categorySelected == null) & (order == null)) {
        fetch(url_products)
            .then(res=>res.json())
            .then(products=>showProducts(products, placement));
    } else if(categorySelected == null) {
        fetch(url_products+"?sort="+order)
            .then(res=>res.json())
            .then(products=>showProducts(products, placement))
    } else if(order == null) {
        fetch(url_products+"/category/"+categorySelected)
        .then(res=>res.json())
        .then(products=>showProducts(products, placement));
    } else {
        fetch(url_products+"/category/"+categorySelected+"?sort="+order)
            .then(res=>res.json())
            .then(products=>showProducts(products, placement))
    }
}

/* Descarga de todas las categorias */
function downloadProduct(product_id) {
    fetch(url_products + "/" + product_id)
            .then(res=>res.json())
            .then(products=>showOneProduct(products));
}

/* Descarga de un producto */
function downloadCategories() {
    fetch(url_categories)
            .then(res=>res.json())
            .then(categories=>putCategories(categories));
}

/* Creo las categorias y les asigno un id, para darles un evento en click, que al pulsarlas, solo salgan productos de esa categoria */
function putCategories(categories) {
    categories.forEach(category=> {
        let a = document.createElement("a");
        a.classList.add("header-button");

        let FL = category.substring(0, 1).toUpperCase();
        let RW = category.substring(1, 99);
        let name_category = FL + RW;

        a.textContent = name_category;
        a.id = category

        HTML_categories.appendChild(a);
    })

    HTML_categories.querySelectorAll(".header-button").forEach(button => {
        button.addEventListener("click", () => {
            categorySelected = button.id;
            scrollActive = false;
    
            downloadProducts();
        })
    })
}

/* Dependiendo de si una variable tiene un valor u otro, crea una lista o una tabla */
function showProducts(products, placementProduct) {
    if(placementProduct == "list") {
        createElementsList(products);
    } else if(placementProduct == "table") {
        createElementsTable(products);
    }
}

/* Llama a la función que crea el contenedor del producto a mostrar */
function showOneProduct(product) {
    createContainerElement(product);
}

/* Función para crear la lista */
function createList() {
    HTML_products.innerHTML = " ";

    let ul = document.createElement("ul");
        
    ul.classList.add("list");

    HTML_products.appendChild(ul);
}

/* Funcion para crear los elementos de la lista */
function createElementsList(products) {
    if(scrollActive == false) {
        createList();
    }

    let list = HTML_products.querySelector("ul");

    products.forEach(product => {
        let item = document.createElement("li");
        let img = document.createElement("img");

        img.src = product.image;
        img.alt = product.title;

        item.classList.add("product");

        let div_info = createDivInfo(product.title, product.price, product.id);
        let div_buttons = createDivButtons(product.id);
        let div_cart = createDivCart();

        item.appendChild(img);
        item.appendChild(div_info);
        item.appendChild(div_buttons);
        item.appendChild(div_cart);

        list.appendChild(item);
    })

    let complete_list = HTML_products.querySelectorAll("li");

    complete_list.forEach(li => {
        let img = li.querySelector("img");
        let h3 = li.querySelector("h3");

        img.addEventListener("click", () => {
            let id = li.querySelector(".hidden").textContent;

            downloadProduct(id);
        });

        h3.addEventListener("click", () => {
            let id = li.querySelector(".hidden").textContent;

            downloadProduct(id);
        });
    })

    placement = "list";
}
/* Funcion para crear la tabla */
function createTable() {
    HTML_products.innerHTML = " ";

    let table = document.createElement("table");
    table.classList.add("table");

    let thead = createTopTable();
    let tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);

    HTML_products.appendChild(table);
}

/* Función para crear los elementos de la tabla */
function createElementsTable(products) {
    if(scrollActive == false) {
        createTable();
    }

    let tbody = HTML_products.querySelector("tbody");

    products.forEach(product => {
        let tr = document.createElement("tr");

        let th_name = document.createElement("th");
        let th_price = document.createElement("th");
        let p_hidden = document.createElement("p");

        th_name.textContent = product.title;
        th_price.textContent = product.price + " €";
        p_hidden.textContent = product.id;

        th_name.classList.add("table-title");

        p_hidden.classList.add("hidden");
        
        let td_image = createImgTable(product.image, product.title);
        let td_buttons = createButtonsTable(product.id);
        let th_input = createInputTable();
        let th_cart = createButtonCart();

        tr.appendChild(td_image);
        tr.appendChild(th_name);
        tr.appendChild(th_price);
        tr.appendChild(p_hidden);
        tr.appendChild(td_buttons);
        tr.appendChild(th_input);
        tr.appendChild(th_cart);

        tbody.appendChild(tr);
    })

    let complete_tr = tbody.querySelectorAll("tr");

    complete_tr.forEach(tr => {
        let img = tr.querySelector("img");
        let th = tr.querySelector(".table-title");

        img.addEventListener("click", () => {
            let id = tr.querySelector(".hidden").textContent;

            downloadProduct(id);
        });

        th.addEventListener("click", () => {
            let id = tr.querySelector(".hidden").textContent;

            downloadProduct(id);
        });
    })
    
    placement = "table";
}

/* Funcion para crear el contenedor que tendrá los datos de un solo producto. */
function createContainerElement(product) {
    HTML_products.innerHTML = " ";

    let div_general = document.createElement("div");
    let img = document.createElement("img");

    let div_info = document.createElement("div");
    let div_bottom_layer = document.createElement("div");

    let div_text = createTextContainer(product.title, product.price, product.category, product.description);
    let div_buttons = createButtonsContainer(product.id);
    let div_input = createInputContainer();
    let div_cart = createCartContainer();

    div_general.classList.add("one-product");
    div_info.classList.add("one-product-info");
    div_bottom_layer.classList.add("one-product-bottom-layer");

    img.src = product.image;
    img.alt = product.title;

    div_bottom_layer.appendChild(div_buttons);
    div_bottom_layer.appendChild(div_input);
    div_bottom_layer.appendChild(div_cart);

    div_info.appendChild(div_text);
    div_info.appendChild(div_bottom_layer);

    div_general.appendChild(img);
    div_general.appendChild(div_info);

    HTML_products.appendChild(div_general);
}

function countLikes(id) {
    let likeCount = localStorage.getItem("like-id-"+id);

    if(likeCount == null) {
        likeCount = 0;
    }

    return likeCount;
}

function countDisLikes(id) {
    let dislikeCount = localStorage.getItem("dislike-id-"+id);

    if(dislikeCount == null) {
        dislikeCount = 0;
    }

    return dislikeCount;
}

/* Funciones para crear los Botones de los Productos */
/* Botón de Me gusta */
function createLikeButton(id_product) {
    let button_like = document.createElement("button");
    let likeCount = countLikes(id_product);

    button_like.innerHTML = "Me Gusta (" + likeCount + ")";
    button_like.id = id_product;

    button_like.addEventListener("click", () => {
        let likeCountEL = localStorage.getItem("like-id-" + button_like.id);
        likeCountEL++;
        localStorage.setItem("like-id-" + button_like.id, likeCountEL);

        button_like.innerHTML = "Me Gusta (" + likeCountEL + ")";
    });

    return button_like;
}

/* Botón de No me gusta */
function createDislikeButton(id_product) {
    let button_dislike = document.createElement("button");
    let dislikeCount = countDisLikes(id_product);

    button_dislike.innerHTML = "No me Gusta (" + dislikeCount + ")";
    button_dislike.id = id_product;

    button_dislike.addEventListener("click", () => {
        let dislikeCountEL = localStorage.getItem("dislike-id-" + button_dislike.id);
        dislikeCountEL++;
        localStorage.setItem("dislike-id-" + button_dislike.id, dislikeCountEL);

        button_dislike.innerHTML = "No me Gusta (" + dislikeCountEL + ")";
    });

    return button_dislike;
}

/* Funciones para crear los elementos de la lista */
/* ---------------------------------------------- */
function createDivInfo(name, price, id) {
    let div_info = document.createElement("div");

    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");

    h3.textContent = name;
    h4.textContent = price + " €";
    p.textContent = id;

    div_info.classList.add("prod-info");
    p.classList.add("hidden");

    div_info.appendChild(h3);
    div_info.appendChild(h4);
    div_info.appendChild(p);

    return div_info;
}

function createDivButtons(id) {
    let div_buttons = document.createElement("div");

    let button_like = createLikeButton(id);
    let button_dislike = createDislikeButton(id);
    let button_fav = document.createElement("button");

    button_fav.innerHTML = "Favorito";

    div_buttons.classList.add("prod-buttoms");

    div_buttons.appendChild(button_like);
    div_buttons.appendChild(button_fav);
    div_buttons.appendChild(button_dislike);

    return div_buttons;
}

function createDivCart() {
    let div_cart = document.createElement("div");
    let div_input = document.createElement("div");

    let label = document.createElement("label");
    let input = document.createElement("input");
    let button = document.createElement("button");

    label.textContent = "Unidades a añadir";
    input.type = "number";
    input.value = 1;
    input.min = 1;
    input.style = "width: 35px";

    button.textContent = "Añadir al Carrito";

    div_cart.classList.add("prod-cart");

    div_input.appendChild(label);
    div_input.appendChild(input);

    div_cart.appendChild(div_input);
    div_cart.appendChild(button);

    return div_cart;
}
/* ---------------------------------------------- */

/* Funciones para crear el interior de la tabla */
/* ---------------------------------------------- */
function createImgTable(image, title) {
    let td = document.createElement("td");
    let img = document.createElement("img");
    let div = document.createElement("div");

    td.classList.add("table-tr-image");
    div.classList.add("table-image");

    img.src = image;
    img.alt = title;

    div.appendChild(img);

    td.appendChild(div);

    return td
}

function createButtonsTable(id) {
    let td = document.createElement("td");
    let div_buttons = document.createElement("div");

    let button_like = createLikeButton(id);
    let button_dislike = createDislikeButton(id);
    let button_fav = document.createElement("button");

    button_fav.innerHTML = "Favorito";

    div_buttons.classList.add("table-buttons");
    button_like.classList.add("table-button");
    button_dislike.classList.add("table-button");
    button_fav.classList.add("table-button");

    div_buttons.appendChild(button_like);
    div_buttons.appendChild(button_fav);
    div_buttons.appendChild(button_dislike);

    td.appendChild(div_buttons);

    return td;
}

function createInputTable() {
    let th = document.createElement("th");
    let input = document.createElement("input");

    input.classList.add("table-input");
    input.classList.add("input");

    input.type = "number";
    input.value = 1;
    input.min = 1;
    input.style = "width: 85px";

    th.appendChild(input);

    return th;
}

function createButtonCart() {
    let th = document.createElement("th");
    let button = document.createElement("button");

    button.textContent = "Añadir a Carrito";

    button.classList.add("table-cart");
    
    th.appendChild(button);

    return th;
}

function createTopTable() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th_1 = document.createElement("th");
    let th_2 = document.createElement("th");
    let th_3 = document.createElement("th");
    let th_4 = document.createElement("th");
    let th_5 = document.createElement("th");
    let th_6 = document.createElement("th");

    th_1.textContent = "Imagen";
    th_2.textContent = "Producto";
    th_3.textContent = "Precio";
    th_4.textContent = "Botones";
    th_5.textContent = "Unidades";
    th_6.textContent = "Carrito";

    tr.appendChild(th_1);
    tr.appendChild(th_2);
    tr.appendChild(th_3);
    tr.appendChild(th_4);
    tr.appendChild(th_5);
    tr.appendChild(th_6);

    thead.appendChild(tr);

    return thead;
}
/* ---------------------------------------------- */

/* Funciones para crear los elementos para mostrar un elemento */
/* ---------------------------------------------- */
function createTextContainer(name, price, category, description) {
    let div = document.createElement("div");

    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");

    div.classList.add("one-product-text");

    h3.textContent = name;
    h4.textContent = price + " €";
    h5.textContent = "Categoría: " + category;
    p.textContent = description;

    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(h5);
    div.appendChild(p);

    return div;
}

function createButtonsContainer(id) {
    let div = document.createElement("div");

    let button_like = createLikeButton(id);
    let button_dislike = createDislikeButton(id);
    let button_fav = document.createElement("button");

    div.classList.add("one-product-buttons");
    
    button_fav.innerHTML = "Favorito";

    div.appendChild(button_like);
    div.appendChild(button_fav);
    div.appendChild(button_dislike);

    return div;
}

function createInputContainer() {
    let div = document.createElement("div");

    let label = document.createElement("label");
    let input = document.createElement("input");

    div.classList.add("one-product-input");

    label.textContent = "Unidades a añadir al Carrito";

    input.id = "amount-to-buy";
    input.type = "number";
    input.value = 1;
    input.min = 1;
    input.style = "width: 35px";

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function createCartContainer() {
    let div = document.createElement("div");
    let button = document.createElement("button");

    div.classList.add("one-product-cart");

    button.textContent = "Añadir al Carrito";

    div.appendChild(button);

    return div;
}
/* ---------------------------------------------- */

/* EventListeners */
document.getElementById("b-list").addEventListener("click", () => {
    placement = "list";
    scrollActive = false;

    downloadProducts();
})

document.getElementById("b-table").addEventListener("click", () => {
    placement = "table";
    scrollActive = false;

    downloadProducts();
})

document.getElementById("b-desc").addEventListener("click", () => {
    order = "desc";
    scrollActive = false;

    downloadProducts();
})

document.getElementById("b-asc").addEventListener("click", () => {
    order = "asc";
    scrollActive = false;

    downloadProducts();
})

document.getElementById("logo").addEventListener("click", () => {
    placement = "list"
    order = null;
    categorySelected = null;
    scrollActive = false;

    downloadProducts();
})

/* innerHeight -> Nos da la altura del área de visualización del navegador.  */
/* scrollY -> Indica cuánto se ha desplazado verticalmente el usuario. */
/* offsetHeight -> Nos da la altura total del contenido de la página. */
window.addEventListener("scroll", async () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
        scrollActive = true;
        downloadProducts();
    }
})