// Dados das viagens disponíveis
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

// ============================================
// NAVBAR SCROLL HIGHLIGHT
// ============================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
let scrollTimeout;

window.addEventListener("scroll", () => {
  // Debounce para melhor performance
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;

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
  }, 50);
});

// ============================================
// CARDS DINÂMICOS E MODALS
// ============================================
const container = document.getElementById("cards-container");
const modalsContainer = document.getElementById("modals-container");

viagens.forEach((viagem, index) => {
  // Criar card
  const cardHTML = `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow">
        <img src="${viagem.imagem}" 
             class="card-img-top card-img-fixed" 
             alt="Destino ${viagem.nome}" 
             loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${viagem.nome}</h5>
          <p class="card-text">${viagem.descricao}</p>
          <button 
            class="btn btn-secondary w-100 ${viagem.pdf ? "" : "disabled"}"
            ${viagem.pdf ? `data-bs-toggle="modal" data-bs-target="#modal${index}"` : ""}
            aria-label="Ver detalhes de ${viagem.nome}">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", cardHTML);

  // Criar modal apenas se houver PDF
  if (viagem.pdf) {
    const modalHTML = `
      <div class="modal fade modal-fullscreen-vertical" id="modal${index}" tabindex="-1" aria-labelledby="modal${index}-title" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal${index}-title">${viagem.nome}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar modal"></button>
            </div>
            <div class="modal-body">
              <iframe 
                src="${viagem.pdf}" 
                title="Detalhes de ${viagem.nome}"
                aria-label="PDF com detalhes de ${viagem.nome}">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;
    modalsContainer.insertAdjacentHTML("beforeend", modalHTML);
  }
});

// ============================================
// VALIDAÇÃO E ENVIO DE FORMULÁRIO
// ============================================
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

// Obter todos os campos do formulário
const formInputs = contactForm.querySelectorAll(
  "input[required], textarea[required]",
);

// Adicionar validação em tempo real (apenas quando o usuário digita)
formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validarCampo(input);
  });

  input.addEventListener("input", () => {
    // Se o campo já foi validado antes (tem a classe was-validated),
    // continua validando conforme digita
    if (contactForm.classList.contains("was-validated")) {
      validarCampo(input);
    }
  });
});

// Função para validar um campo específico
function validarCampo(input) {
  if (!input.validity.valid) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

// Envio do formulário com validação completa
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Marcar formulário como foi tentado enviar
  contactForm.classList.add("was-validated");

  // Validar todos os campos
  formInputs.forEach((input) => {
    validarCampo(input);
  });

  // Se há campos inválidos, não enviar
  if (!contactForm.checkValidity()) {
    return;
  }

  // Desabilitar botão e mostrar loading
  submitBtn.disabled = true;
  document.getElementById("submit-spinner").classList.remove("d-none");
  document.getElementById("submit-text").classList.add("d-none");

  try {
    // Coletar dados do formulário
    const formData = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value || "Não informado",
      mensagem: document.getElementById("mensagem").value,
      timestamp: new Date().toISOString(),
    };

    // Simular envio (em produção, enviar para um backend)
    console.log("Dados do formulário:", formData);

    // Simular delay de envio
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mensagem de sucesso
    formMessage.className = "alert alert-success";
    formMessage.innerHTML =
      "<strong>✓ Sucesso!</strong> Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.";

    // Resetar formulário
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  } catch (error) {
    // Mensagem de erro
    formMessage.className = "alert alert-danger";
    formMessage.innerHTML =
      "<strong>✗ Erro!</strong> Houve um problema ao enviar sua mensagem. Tente novamente.";
    console.error("Erro ao enviar formulário:", error);
  } finally {
    // Reabilitar botão
    submitBtn.disabled = false;
    document.getElementById("submit-spinner").classList.add("d-none");
    document.getElementById("submit-text").classList.remove("d-none");

    // Remover mensagem após 6 segundos
    setTimeout(() => {
      formMessage.innerHTML = "";
    }, 6000);
  }
});
