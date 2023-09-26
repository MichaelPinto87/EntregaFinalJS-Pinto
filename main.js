document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const baseDeDatos = [
    {
      id: 12,
      nombre: "Remera Larga Nike ",
      categoria: "Remera",
      precio: 69.99,
      marca: "Nike",
      imagen: "img/Remera3.png",
      descripcion: "Remera manga larga Nike.",
    },
    {
      id: 6,
      nombre: "Pantalon Nike Jordan ",
      categoria: "Pantalones",
      precio: 39.99,
      marca: "Nike Jordan",
      imagen: "img/Pantalon2.png",
      descripcion: "Pantalon Nike Jordan MVP.",
    },
    ,
    {
      id: 7,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "img/Pantalon3.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 7,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "img/Pantalon3.png",
      descripcion: "Calza común Nike.",
    },
    {
      id: 8,
      nombre: "Calza Nike",
      categoria: "Pantalon",
      precio: 39.99,
      marca: "Nike",
      imagen: "img/Pantalon4.png",
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

const productos = [
  {
    id: 1,
    producto: "Buzo Nike Air Black",

    categoria: "Buzo",
    precio: 79.99,
    marca: "Nike",
    imagen: "img/Buzo1.png",
    descripcion: "Buzo Nike de color negro.",
  },
  {
    id: 2,
    producto: "Buzo Nike Air White",
    categoria: "Buzo",
    precio: 80.99,
    marca: "Nike",
    imagen: "img/Buzo2.png",
    descripcion: "Buzo Nike de color blanco.",
  },
  {
    id: 3,
    producto: "Buzo Nike",
    oferta: "si",
    categoria: "Buzo",
    precio: 70.99,
    marca: "Nike",
    imagen: "img/Buzo3.png",
    descripcion: "Buzo Nike común",
  },
  {
    id: 4,
    producto: "Buzo Nike 72",
    categoria: "Buzo",
    precio: 80.99,
    marca: "Corsair",
    imagen: "img/Buzo4.png",
    descripcion: "Buzo Nike 72.",
  },
  {
    id: 5,
    producto: "Pantalon Nike Air",
    categoria: "Pantalones",
    precio: 50,
    marca: "Nike",
    imagen: "img/Pantalon1.png",
    descripcion: "Pantalon Nike Air",
  },
  {
    id: 6,
    producto: "Pantalon Nike Jordan ",
    oferta: "si",
    categoria: "Pantalones",
    precio: 39.99,
    marca: "Nike Jordan",
    imagen: "img/Pantalon2.png",
    descripcion: "Pantalon Nike Jordan MVP.",
  },
  {
    id: 7,
    producto: "Calza Nike",
    oferta: "si",
    categoria: "Pantalon",
    precio: 39.99,
    marca: "Nike",
    imagen: "img/Pantalon3.png",
    descripcion: "Calza común Nike.",
  },
  {
    id: 8,
    producto: "Remera Nike Jordan",
    oferta: "si",
    categoria: "Remera",
    precio: 49.99,
    marca: "Nike Jordan",
    imagen: "img/Remera1.png",
    descripcion: "Remera Nike Air Jordan.",
  },
  {
    id: 9,
    producto: "Remera Nike Jordan",

    categoria: "Remera",
    precio: 49.99,
    marca: "Nike Jordan",
    imagen: "img/zapatilla3.jpeg",
    descripcion: "Remera Nike Air Jordan.",
  },
  {
    id: 10,
    producto: "Remera Nike Jordan",

    categoria: "Remera",
    precio: 49.99,
    marca: "Nike Jordan",
    imagen: "img/zapatilla2.jpg",
    descripcion: "Remera Nike Air Jordan.",
  },
  {
    id: 11,
    producto: "Remera Nike Jordan",

    categoria: "Remera",
    precio: 49.99,
    marca: "Nike Jordan",
    imagen: "img/zapatilla1.jpg",
    descripcion: "Remera Nike Air Jordan.",
  },
];

const generarTarjetas = (productos) => {
  const contenedor = document.getElementById("productos-container");

  const tarjetasHTML = productos.reduce((acumulador, producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    const nombre = document.createElement("h2");
    nombre.textContent = producto.producto;

    const precio = document.createElement("p");
    precio.textContent = ` $${producto.precio}`;

    const descripcion = document.createElement("p");

    const botonAgregar = document.createElement("button");

    const imagen = document.createElement("img");
    if (producto.imagen) {
      imagen.src = producto.imagen;
      imagen.alt = producto.producto;
    } else {
      imagen.src = "img/imagen_por_defecto.jpg";
      imagen.alt = "Imagen prenda Nike";
    }
    botonAgregar.addEventListener("click", () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    tarjeta.appendChild(nombre);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(imagen);

    acumulador.appendChild(tarjeta);
    return acumulador;
  }, document.createElement("div"));

  contenedor.innerHTML = "";
  contenedor.appendChild(tarjetasHTML);
};

generarTarjetas(productos);

const sortSelect = document.getElementById("sort");
const filterCheckbox = document.getElementById("filter");

sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;

  ordenarProductos(selectedValue);
});

filterCheckbox.addEventListener("change", () => {
  const isChecked = filterCheckbox.checked;

  filtrarProductos(isChecked);
});

function ordenarProductos(order) {
  if (order === "asc") {
    productos.sort((a, b) => a.producto.localeCompare(b.producto));
  } else if (order === "desc") {
    productos.sort((a, b) => b.producto.localeCompare(a.producto));
  }

  generarTarjetas(productos);
}

function filtrarProductos(isChecked) {
  if (isChecked) {
    const productosConOferta = productos.filter(
      (producto) => producto.oferta === "si"
    );
    generarTarjetas(productosConOferta);
  } else {
    generarTarjetas(productos);
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

Swal.fire("Bienvenido");

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

js;
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = contactForm.querySelector("#name").value;
    const email = contactForm.querySelector("#email").value;
    const message = contactForm.querySelector("#message").value;

    if (name.length < 3) {
      confirmationMessage.innerText =
        "El nombre debe tener al menos 3 caracteres.";
    } else if (!email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/)) {
      confirmationMessage.innerText = "El email ingresado no es válido.";
    } else {
      confirmationMessage.innerText = "Formulario enviado correctamente.";
      contactForm.reset();
    }
  });
});
