/* scrollY -> Nos indica la cantidad de pixeles nos hemos desplazado del principio de la página, hasta el final */
/* innerHeight -> Nos da la tamaño en pixeles del navegador.  */
/* scrollHeight -> Nos da la altura total del contenido de la página. */
// Cuando llegamos al final del documento, la propiedad scrollY, es mas grande que el tamaño total de la página, ya que este esta siendo reducido por
// el tamaño de la ventana, para que al llegar al final, se carguen los productos de nuevo.
window.addEventListener("scroll", () => {
    if(window.scrollY >= document.body.scrollHeight - window.innerHeight ) {
        scrollActive = true;
        downloadProducts();
    }
})
