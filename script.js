const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top; // posição relativa à viewport
    const sectionHeight = section.offsetHeight;

    // Verifica se 20% da tela de cima para baixo está dentro da seção
    if (
      sectionTop <= window.innerHeight * 0.2 &&
      sectionTop + sectionHeight > window.innerHeight * 0.2
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
