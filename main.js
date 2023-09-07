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
    categoria: "Pantalones",
    precio: 39.99,
    marca: "Nike Jordan",
    imagen: "img/Pantalon2.png",
    descripcion: "Pantalon Nike Jordan MVP.",
  },
  {
    id: 7,
    producto: "Calza Nike",
    categoria: "Pantalon",
    precio: 39.99,
    marca: "Nike",
    imagen: "img/Pantalon3.png",
    descripcion: "Calza común Nike.",
  },
  {
    id: 8,
    producto: "Remera Nike Jordan",
    categoria: "Remera",
    precio: 49.99,
    marca: "Nike Jordan",
    imagen: "img/Remera1.png",
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
      imagen.alt = "Imagen no disponible";
    }
    botonAgregar.addEventListener("click", () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      Toastify({
        text: "Producto agregado al carrito!",
        duration: 1500,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 0, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
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

const swiper = new Swiper(".swiper", {
  // Optional parameters

  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

Swal.fire("Santi puto");

// Función para cambiar el modo
function toggleDarkMode() {
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const cards = document.querySelectorAll(".card");

  // Cambia la clase del cuerpo para activar/desactivar el modo oscuro
  body.classList.toggle("dark-mode");
  navbar.classList.toggle("dark-mode");

  // Cambia la clase de las tarjetas (si tienes más elementos para cambiar)
  cards.forEach((card) => {
    card.classList.toggle("dark-mode");
  });

  // Guarda el estado actual del modo en localStorage
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkMode);
}

// Verifica si el modo oscuro está activado en localStorage y aplícalo
const storedDarkMode = localStorage.getItem("dark-mode");
if (storedDarkMode === "true") {
  toggleDarkMode();
}

// Agrega un event listener al botón para alternar el modo oscuro
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", toggleDarkMode);
}
const divisa = "$";
