const BUSCADORFORM = document.getElementById("buscador")

BUSCADORFORM.addEventListener("submit", (event)=>{
    event.preventDefault()
    console.log("hola")
    let termino = BUSCADORFORM['termino'].value
    console.log(termino)
    localStorage.setItem("termino", termino)
    window.location= '/catalogo'


})