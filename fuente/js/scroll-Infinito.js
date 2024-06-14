/* innerHeight -> Nos da la altura del área de visualización del navegador.  */
/* scrollY -> Indica cuánto se ha desplazado verticalmente el usuario. */
/* offsetHeight -> Nos da la altura total del contenido de la página. */
window.addEventListener("scroll", async () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
        scrollActive = true;
        downloadProducts();
    }
})