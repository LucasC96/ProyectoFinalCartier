const modalOff = () => { modal.style.display ="none" }

const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
        modalOff()
      });

const mostrarCarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class = modal-header-title> 🛒 Mi Carrito </h1>
    `;
    
    modal.append(modalHeader);
    
    modalHeader.append(modalButton);
    
    carrito.forEach((product) =>{
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class=price>$${product.precio}</p>
        <span class="restar"> ➖ </span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar"> ➕ </span>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="delete"> ❌ </span>
    `;

    modal.append(carritoContent);
    
    let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            const chequeo = product.cantidad !==1;
            chequeo && product.cantidad--;
        contadorCarrito();
        saveLocal();
        mostrarCarrito();
    });
    let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
        product.cantidad++;
        contadorCarrito();
        saveLocal();
        mostrarCarrito();
    });

    let eliminar= carritoContent.querySelector(".delete");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(product.id);
        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #121212, #CD0404)",
            },
            onClick: function(){}
          }).showToast();
        contadorCarrito();
        carrito.length===0 && modalOff();
    });
    });
    
    const total = carrito.reduce((acumulador,prod) => acumulador + prod.precio * prod.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $${total} `;
    modal.append(totalCompra);

    const finalizarButton = document.createElement("button");
    finalizarButton.innerText = "Finalizar compra";
    finalizarButton.className = "finalizar-button";
    totalCompra.append(finalizarButton);
    finalizarButton.addEventListener("click", finalizarCompra);
};

verCarrito.addEventListener("click", mostrarCarrito);

const eliminarProducto = (id) => {
    const buscarID = carrito.find((prod) => prod.id === id);
    carrito = carrito.filter((sacarID) => { 
        return sacarID !== buscarID;
    });
    contadorCarrito();
    saveLocal();
    mostrarCarrito();

};

const contadorCarrito = () => {
    cantidadProductos.style.display = "block";
    let cantidadProd = 0;
    carrito.forEach((product) =>{
        cantidadProd = cantidadProd + product.cantidad;
    })
    localStorage.setItem("cantidadProd", JSON.stringify(cantidadProd));
    cantidadProductos.innerText = JSON.parse(localStorage.getItem("cantidadProd"));
};

const finalizarCompra = () => {
    modal.innerHTML = "";
    modal.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h2 class = modal-header-title> Completa tus datos para finalizar la compra: </h2>
    `;
    
    modal.append(modalHeader);
    
    modalHeader.append(modalButton);

    const formulario = document.createElement("form");
    formulario.className = "formulario-compra";
    formulario.innerHTML = `
        <label for="nombre">Nombre completo:</label>
        <input class="formulario-input" type="text" id="nombre" name="nombre" required>
        <label for="email">Email:</label>
        <input class="formulario-input" type="email" id="email" name="email" required>
        <label for="telefono">Teléfono:</label>
        <input class="formulario-input" type="tel" id="telefono" name="telefono" required>
        <label for="tarjeta">Número de tarjeta:</label>
        <input class="formulario-input" type="text" id="tarjeta" name="tarjeta" pattern="[0-9]{16}" required>
        <label for="fecha">Fecha de expiración:</label>
        <input class="formulario-input" type="month" id="fecha" name="fecha" required>
        <label for="cvv">CVV:</label>
        <input class="formulario-input" type="text" id="cvv" name="cvv" pattern="[0-9]{3}" required>
        <button type="submit" class="finalizarButton">Finalizar compra</button>
    `;

    modal.append(formulario);   
    
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const fecha = document.getElementById("fecha").value;
        const cvv = document.getElementById("cvv").value;
        const total = carrito.reduce((acumulador,prod) => acumulador + prod.precio * prod.cantidad, 0);
        
        carrito = [];
        saveLocal();
        contadorCarrito();
        modal.innerHTML = `
            <h1>¡Gracias por tu compra!</h1>
            <p>Hemos enviado un correo de confirmación a ${email} con los detalles de tu compra.</p>
            <p>Tu total fue de $${total}.</p>
            <button onclick="window.location.reload()">Volver a comprar</button>
        `;
    });
};

contadorCarrito();
