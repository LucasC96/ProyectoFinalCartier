const tienda = document.getElementById("tienda");
const verCarrito = document.getElementById("verCarrito");
const modal = document.getElementById("modal");
const cantidadProductos = document.getElementById("cantidadProductos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getData = async () => {
    const response = await fetch ("data.json");
    const data = await response.json();
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card",
        content.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.año}</p>
            <p class=price>$${product.precio}</p>
        `;
    
        tienda.append(content);
    
        let agregarCarrito = document.createElement("button");
        agregarCarrito.innerText = "Agregar a carrito";
    
        content.append(agregarCarrito);
    
        agregarCarrito.addEventListener("click", () => {
            const repeat = carrito.some((repeatProd) => repeatProd.id === product.id);
            if (repeat){
                carrito.map((prod) => {
                    prod.id === product.id && prod.cantidad++;
                })
                Swal.fire({
                    title: "Suma de producto correcta",
                    text: "🌶️" + product.nombre + "🌶️",
                    imageUrl: product.img,
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: "Album cover",
                  })
            } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
            Swal.fire({
                title: "Nuevo producto agregado",
                text: "🌶️" + product.nombre + "🌶️",
                imageUrl: product.img,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: "Album cover",
              })
        }
        contadorCarrito();
        saveLocal();
        })
    });
};

getData();

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));



