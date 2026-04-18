// ============================================================
// DARK MODE TOGGLE
// Padrão: desativado (modo claro). Preferência salva em localStorage.
// A classe html.dark-mode é adicionada pelo script anti-FOUC no <head>
// antes do CSS carregar, para evitar flash de conteúdo incorreto.
// ============================================================
(function () {
  const toggle = document.getElementById("dark-mode-toggle");
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");
  const html = document.documentElement;

  function aplicarDarkMode(ativo) {
    html.classList.toggle("dark-mode", ativo);
    iconMoon.style.display = ativo ? "none" : "";
    iconSun.style.display = ativo ? "" : "none";
    localStorage.setItem("milktur-dark", ativo ? "1" : "0");
    toggle.setAttribute("aria-label", ativo ? "Desativar modo escuro" : "Ativar modo escuro");
  }

  // Sincroniza ícone com o estado atual (que pode ter sido definido pelo anti-FOUC)
  aplicarDarkMode(html.classList.contains("dark-mode"));

  toggle.addEventListener("click", () => {
    aplicarDarkMode(!html.classList.contains("dark-mode"));
  });
})();

// ============================================================
// CONFIGURAÇÃO DO EMAILJS
// ✏️ Substitua os valores abaixo com suas credenciais em:
//    https://dashboard.emailjs.com
// ============================================================
const EMAILJS_PUBLIC_KEY = "V1_4ZdHs6_lfRGRkL";
const EMAILJS_SERVICE_ID = "service_7suojhl";
const EMAILJS_TEMPLATE_ID = "template_3kz5e5u";

// Inicializa EmailJS apenas se o SDK estiver carregado e a chave configurada
// EmailJS v4 exige objeto { publicKey } — string simples não funciona na v4
if (
  typeof emailjs !== "undefined" &&
  EMAILJS_PUBLIC_KEY !== "SUA_PUBLIC_KEY_AQUI"
) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// ============================================================
// NAVBAR SCROLL HIGHLIGHT
// ============================================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
let scrollTimeout;

window.addEventListener("scroll", () => {
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

// ============================================================
// CARDS DINÂMICOS E MODALS — carregados via fetch do JSON
// ============================================================
const container = document.getElementById("cards-container");
const modalsContainer = document.getElementById("modals-container");

/**
 * Renderiza os cards e modals a partir do array de viagens.
 * Usa <picture> + <source> para servir .webp (quando disponível) com fallback .png
 * O campo "imagem" sempre aponta para o .png (que existe).
 * O campo "imagemWebp" aponta para o .webp — só é usado quando o arquivo existir.
 */
function renderizarViagens(viagens) {
  viagens.forEach((viagem, index) => {
    // Se houver versão webp, usa <picture> para oferecer as duas opções ao navegador
    const pictureHTML = viagem.imagemWebp
      ? `<picture>
           <source srcset="${viagem.imagemWebp}" type="image/webp">
           <img src="${viagem.imagem}"
                class="card-img-top card-img-fixed"
                alt="Destino ${viagem.nome}"
                loading="lazy">
         </picture>`
      : `<img src="${viagem.imagem}"
              class="card-img-top card-img-fixed"
              alt="Destino ${viagem.nome}"
              loading="lazy">`;

    const cardHTML = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow">
          ${pictureHTML}
          <div class="card-body">
            <h5 class="card-title">${viagem.nome}</h5>
            <p class="card-text">${viagem.descricao}</p>
            <button
              class="btn btn-secondary w-100 ${viagem.pdf ? "" : "disabled"}"
              ${viagem.pdf ? `data-pdf="${viagem.pdf}" data-modal="#modal${index}"` : ""}
              aria-label="Ver detalhes de ${viagem.nome}">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHTML);

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
}

/**
 * Exibe mensagem de erro amigável no container de cards
 */
function exibirErroViagens() {
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <p class="text-muted fs-5">
        Não foi possível carregar as viagens no momento.<br>
        <small>Tente recarregar a página.</small>
      </p>
    </div>
  `;
}

// Buscar viagens do JSON externo (compatível com GitHub Pages)
fetch("data/viagens.json")
  .then((res) => {
    if (!res.ok) throw new Error("Falha ao carregar viagens.json");
    return res.json();
  })
  .then(renderizarViagens)
  .catch((err) => {
    console.error("Erro ao carregar viagens:", err);
    exibirErroViagens();
  });

// ============================================================
// VISUALIZAÇÃO DE PDF — modal no desktop, nova aba no mobile
// iOS Safari não renderiza <iframe> com PDF, por isso usamos
// nova aba em dispositivos touch/mobile (≤ 768px).
// ============================================================
container.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-pdf]");
  if (!btn) return;

  const pdfUrl = btn.dataset.pdf;
  const modalTarget = btn.dataset.modal;
  const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

  if (isMobile) {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  } else {
    const modalEl = document.querySelector(modalTarget);
    if (modalEl) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  }
});

// ============================================================
// VALIDAÇÃO E ENVIO DE FORMULÁRIO VIA EMAILJS
// ============================================================
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");
const formInputs = contactForm.querySelectorAll(
  "input[required], textarea[required]",
);

// Validação em tempo real — só após interação do usuário
formInputs.forEach((input) => {
  input.addEventListener("blur", () => validarCampo(input));

  input.addEventListener("input", () => {
    if (contactForm.classList.contains("was-validated")) {
      validarCampo(input);
    }
  });
});

function validarCampo(input) {
  if (!input.validity.valid) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

// ============================================================
// MÁSCARA DE TELEFONE — (00) 00000-0000 ou (00) 0000-0000
// ============================================================
const telefoneInput = document.getElementById("telefone");
if (telefoneInput) {
  telefoneInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) {
      // Celular: (00) 00000-0000
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 6) {
      // Fixo: (00) 0000-0000
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (v.length > 0) {
      v = v.replace(/^(\d{0,2})/, "($1");
    }
    e.target.value = v;
  });

  // Garante que ao colar o número ele seja formatado
  telefoneInput.addEventListener("paste", () => {
    setTimeout(() => telefoneInput.dispatchEvent(new Event("input")), 0);
  });
}

// Envio do formulário
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactForm.classList.add("was-validated");
  formInputs.forEach((input) => validarCampo(input));

  if (!contactForm.checkValidity()) return;

  // Loading
  submitBtn.disabled = true;
  document.getElementById("submit-spinner").classList.remove("d-none");
  document.getElementById("submit-text").classList.add("d-none");
  formMessage.innerHTML = "";
  formMessage.className = "mt-3";

  // Parâmetros enviados ao template do EmailJS
  // ✏️ Os nomes das variáveis (from_name, from_email, etc.) devem
  //    corresponder às variáveis configuradas no seu template EmailJS
  const templateParams = {
    from_name: document.getElementById("nome").value,
    from_email: document.getElementById("email").value,
    from_phone: document.getElementById("telefone").value || "Não informado",
    message: document.getElementById("mensagem").value,
  };

  try {
    // Verificar se EmailJS está configurado antes de tentar enviar
    if (
      typeof emailjs === "undefined" ||
      EMAILJS_PUBLIC_KEY === "SUA_PUBLIC_KEY_AQUI"
    ) {
      throw new Error("EmailJS não configurado");
    }
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    formMessage.className = "alert alert-success mt-3";
    formMessage.innerHTML =
      "<strong>✓ Mensagem enviada!</strong> Entraremos em contato em breve.";

    contactForm.reset();
    contactForm.classList.remove("was-validated");
    formInputs.forEach((input) => {
      input.classList.remove("is-valid", "is-invalid");
    });
  } catch (error) {
    const naoConfigurado = error.message === "EmailJS não configurado";
    formMessage.className = "alert alert-danger mt-3";
    formMessage.innerHTML = naoConfigurado
      ? "<strong>Formulário não configurado.</strong> Configure o EmailJS em script.js para ativar o envio."
      : "<strong>✗ Erro ao enviar.</strong> Tente novamente ou entre em contato pelo WhatsApp.";
    console.error(
      "EmailJS error:",
      error?.status,
      error?.text ?? error?.message ?? error,
    );
  } finally {
    submitBtn.disabled = false;
    document.getElementById("submit-spinner").classList.add("d-none");
    document.getElementById("submit-text").classList.remove("d-none");

    setTimeout(() => {
      formMessage.innerHTML = "";
      formMessage.className = "mt-3";
    }, 7000);
  }
});
