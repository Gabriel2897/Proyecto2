const DIV_CATALOGO = document.getElementById("catalogo-container");

let newtermino = localStorage.getItem("termino")

fetch("/resultados-de-busqueda?termino=" + newtermino)
    .then((res) => res.json())
    .then(response => {
        console.log(response)
        mostrarProductos(response);
        localStorage.removeItem("termino")
    })

function mostrarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        const img = document.createElement("img");
        const divCardBody = document.createElement("div");
        const h5 = document.createElement("h5");
        const p = document.createElement("p");
        const button = document.createElement("button");

        div.classList.add("col");
        div2.classList.add("card-cata");
        img.classList.add("img-cata");
        divCardBody.classList.add("card-body");
        h5.classList.add("card-title");
        p.classList.add("card-text");
        button.classList.add("compra");

        img.setAttribute("src", producto.url_img);
        img.setAttribute("alt", "foto");
        h5.innerText = `${producto.name} ${producto.price}$`;
        p.innerText = producto.description;
        button.innerText = "Agregar al carrito";

        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(button);
        div2.appendChild(img);
        div2.appendChild(divCardBody);
        div.appendChild(div2);
        DIV_CATALOGO.appendChild(div);

        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });

}
