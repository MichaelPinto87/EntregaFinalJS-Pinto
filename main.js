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
  {
    id: 9,
    producto: "Remera Nike Jordan Gris",
    categoria: "Remera",
    precio: 69.99,
    marca: "Nike Jordan",
    imagen: "img/Remera2.png",
    descripcion: "Remera Nike Jordan.",
  },
  {
    id: 10,
    producto: "Remera Larga Nike Negra",
    categoria: "Remera",
    precio: 69.99,
    marca: "Nike",
    imagen: "img/Remera3.png",
    descripcion: "Remera manga larga Nike.",
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
    precio.textContent = `Precio: $${producto.precio}`;

    const descripcion = document.createElement("p");
    descripcion.textContent =
      producto.descripcion || "Descripción no disponible";

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al Carrito";

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
      alert("Producto agregado al carrito.");
    });

    tarjeta.appendChild(nombre);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(botonAgregar);

    acumulador.appendChild(tarjeta);
    return acumulador;
  }, document.createElement("div"));

  contenedor.innerHTML = "";
  contenedor.appendChild(tarjetasHTML);
};

generarTarjetas(productos);
