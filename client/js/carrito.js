const DIV_PRODUCTOS = document.getElementById("products-container");
const UL_CARRITO = document.getElementById("carrito-container")
const TOTAL_CARRO = document.getElementById('totalCarrito');
const OFFCANVAS_CARRITO = document.getElementById("carrito");

let productos = [
    {
        id: 16,
        url_img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/536/593/products/marcada111-052809763b34d7a43c16546139792656-480-0.jpg",
        name: "BROWNIE CLASICO",
        price: 4700,
        description: "Brownie con dulce de leche y merengue Italiano. Rinde: 10 a 12 porciones. (tamaño 20cm)"
    },
    {
        id: 17,
        url_img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/536/593/products/marcada311-ad54cfe656337b58f116208570312671-480-0.jpg",
        name: "Torta corazon, letra o número",
        price: 8200,
        description: "Decorada con macarons, ferreros, marroc y moneditas. Se entrega en base de madera, caja con visor y postal."
    },
    {
        id: 18,
        url_img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/536/593/products/marcada4011-34cc7142d4f74dba5815603892806969-480-0.jpg",
        name: "BROWNIE OREO",
        price: 6600,
        description: "Brownie con galletitas oreo en su interior, dulce de leche y crema oreo. Decorado con oreo y salsa de chocolate. Rinde de 10 a 12 porciones (20 cm)"
    },
    {
        id: 19,
        url_img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/536/593/products/marcada91-71699d5bbe67610fb015603868461743-480-0.jpg",
        name: "MARQUISE",
        price: 5100,
        description: "Brownie con dulce de leche, crema y merengue italiano. Rinde: 10 a 12 porciones (20 cm)"
    }
]
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (!productoEnCarrito) {
        carrito.push({
            id: producto.id,
            name: producto.name,
            price: producto.price,
            url_img: producto.url_img,
            cantidad: 1
        });
        renderCarrito();
    } else {
        alert('El producto ya está en el carrito.');
    }
}

function renderCarrito() {
    let total = 0;
    UL_CARRITO.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.className = 'carrito-item';

        const productImage = document.createElement("img");
        productImage.src = producto.url_img;
        productImage.className = 'carrito-image';
        li.appendChild(productImage);

        const productName = document.createElement("span");
        productName.innerText = producto.name;
        li.appendChild(productName);

        const productPrice = document.createElement("span");
        productPrice.innerText = `$ ${producto.price} cantidad ${producto.cantidad}`;
        li.appendChild(productPrice);

        const addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.className = 'carrito-button';
        addButton.addEventListener("click", () => {
            producto.cantidad++;
            renderCarrito();
        });
        li.appendChild(addButton);

        const removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.className = 'carrito-button';
        removeButton.addEventListener("click", () => {
            producto.cantidad--;
            if (producto.cantidad <= 0) {
                carrito.splice(index, 1);
            }
            renderCarrito();
        });
        li.appendChild(removeButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.className = 'carrito-button';
        deleteButton.addEventListener("click", () => {
            carrito.splice(index, 1);
            renderCarrito();
        });
        li.appendChild(deleteButton);

        total += producto.price * producto.cantidad;
        UL_CARRITO.appendChild(li);
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    TOTAL_CARRO.textContent = `Total del Carrito: $ ${total}`;
    if (carrito.length > 0) {
        const payButton = document.createElement("button");
        payButton.innerText = "Pagar";
        payButton.className = 'carrito-button';
        payButton.addEventListener("click", finalizarCompra);
        UL_CARRITO.appendChild(payButton);
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancelar";
        cancelButton.className = 'carrito-button';
        cancelButton.addEventListener("click", () => {
            alert("La compra a sido cancelada");
            carrito = [];
            localStorage.removeItem("carrito");
            renderCarrito();
            const offcanvasCarritoInstance = bootstrap.Offcanvas.getInstance(OFFCANVAS_CARRITO);
            offcanvasCarritoInstance.hide();
        });
        UL_CARRITO.appendChild(cancelButton);
    }
}
async function finalizarCompra() {
    alert("Procesando el pago");

    try {
        const response = await fetch('/procesarCompra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carrito),
        });

        const data = await response.json();
        if (data.success) {
            alert('Compra realizada con éxito!');

            carrito = [];
            localStorage.removeItem("carrito");
            renderCarrito();

            const offcanvasCarritoInstance = bootstrap.Offcanvas.getInstance(OFFCANVAS_CARRITO);
            offcanvasCarritoInstance.hide();
        } else {
            console.error(data.error);
            alert('Hubo un problema con la compra.');
        }

    } catch (error) {
        alert('Error al procesar la compra.');
    }
}
renderCarrito();