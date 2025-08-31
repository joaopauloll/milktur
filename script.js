const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const viagens = [
  {
    nome: "Sul da Bahia",
    descricao: "Porto Seguro, Trancoso e Arraial d'Ajuda te esperam!",
    imagem: "assets/imgs/bahia.png",
    pdf: "assets/pdfs/sul-da-bahia.pdf",
  },
  {
    nome: "Turquia e Dubai",
    descricao: "Explore a rica cultura da Turquia e o luxo de Dubai.",
    imagem: "assets/imgs/turquia.png",
    pdf: "assets/pdfs/turquia-e-dubai.pdf",
  },
  {
    nome: "Fortaleza e Canoa Quebrada",
    descricao: "Sol, mar e diversão no Ceará.",
    imagem: "assets/imgs/canoa-quebrada.png",
    pdf: "",
  },
  {
    nome: "Semana Santa",
    descricao: "Recife, Gravatá e Nova Jerusalém.",
    imagem: "assets/imgs/jerusalem.png",
    pdf: "assets/pdfs/semana-santa.pdf",
  },
];

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

const container = document.getElementById("cards-container");
viagens.forEach((viagem, index) => {
  const cardHTML = `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow">
        <img src="${viagem.imagem}" 
             class="card-img-top card-img-fixed" 
             alt="${viagem.nome}" 
             loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${viagem.nome}</h5>
          <p class="card-text">${viagem.descricao}</p>
            <a href="${viagem.pdf}" target="_blank" class="btn btn-secondary ${
    viagem.pdf ? "" : "disabled"
  }">Ver Detalhes</a>
        </div>
      </div>
    </div>

    <div class="modal fade modal-fullscreen-vertical" id="modal${index}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${viagem.nome}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <iframe src="${viagem.pdf}"></iframe>
          </div>
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", cardHTML);
});
