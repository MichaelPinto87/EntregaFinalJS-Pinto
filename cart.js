document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Remera Larga Nike ",
      categoria: "Remera",
      precio: 69.99,
      marca: "Nike",
      imagen: "../img/Remera1.png",
      descripcion: "Remera manga larga Nike.",
    },
    {
      id: 2,
      nombre: "Pantalon Nike Jordan ",
      categoria: "Pantalones",
      precio: 39.99,
      marca: "Nike Jordan",
      imagen: "../img/Remera2.png",
      descripcion: "Pantalon Nike Jordan MVP.",
    },
    ,
    {
      id: 3,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Remera3.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 4,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Pantalon1.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 8,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Pantalon2.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 8,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Pantalon3.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 8,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Buzo3.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 8,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Buzo2.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 9,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/Buzo1.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 10,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/zapatilla2.jpg",
      descripcion: "Calza común Nike.",
    },
    {
      id: 11,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/zapatilla1.jpg",
      descripcion: "Calza común Nike.",
    },
    {
      id: 12,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "../img/zapatilla3.jpeg",
      descripcion: "Calza común Nike.",
    },
  ];

  let carrito = [];
  const divisa = "$";
  const DOMitems = document.querySelector("#items");
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");
  const miLocalStorage = window.localStorage;

  // Funciones

  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");

      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");

      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;

      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);

      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${info.precio}${divisa}`;

      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-dark");
      miNodoBoton.textContent = "Agregar al carrito";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }

  function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"));

    renderizarCarrito();

    guardarCarritoEnLocalStorage();
  }

  function renderizarCarrito() {
    DOMcarrito.textContent = "";

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });

      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        return itemId === item ? (total += 1) : total;
      }, 0);

      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-right", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-1");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);

      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
  }

  function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });

    renderizarCarrito();

    guardarCarritoEnLocalStorage();
  }

  function calcularTotal() {
    return carrito
      .reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
  }

  function vaciarCarrito() {
    Swal.fire("¡Muchas gracias por su compra!");
    carrito = [];

    renderizarCarrito();

    localStorage.clear();
  }

  function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage() {
    if (miLocalStorage.getItem("carrito") !== null) {
      carrito = JSON.parse(miLocalStorage.getItem("carrito"));
    }
  }

  DOMbotonVaciar.addEventListener("click", vaciarCarrito);

  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});

function toggleDarkMode() {
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const cards = document.querySelectorAll(".card");

  body.classList.toggle("dark-mode");
  navbar.classList.toggle("dark-mode");

  cards.forEach((card) => {
    card.classList.toggle("dark-mode");
  });

  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkMode);
}

const storedDarkMode = localStorage.getItem("dark-mode");
if (storedDarkMode === "true") {
  toggleDarkMode();
}

const darkModeToggle = document.getElementById("dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", toggleDarkMode);
}
const divisa = "$";
