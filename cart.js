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
