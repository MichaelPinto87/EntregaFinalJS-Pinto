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
