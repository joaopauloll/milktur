# Milktur - Agência de Viagens

Site estático de agência de viagens com destinos nacionais e internacionais. Compatível com GitHub Pages — sem backend necessário.

## Características

- Responsivo: desktop, tablet e mobile
- Acessível: ARIA, navegação por teclado, `prefers-reduced-motion`
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD (TravelAgency), sitemap e robots.txt
- Formulário de contato com EmailJS (envio real de e-mail)
- Máscara automática no campo de telefone
- Botão flutuante de WhatsApp
- Viagens carregadas via `fetch` a partir de `data/viagens.json`
- Modais com visualização de PDF em tela cheia
- Validação de formulário em tempo real (feedback só após interação)
- Parallax no hero desativado em mobile (bug iOS/Android)
- Suporte preparado para imagens `.webp` com fallback `.png`

## Como Executar

O projeto requer um servidor HTTP local para que o `fetch` do JSON funcione corretamente. Abrir `index.html` diretamente pelo sistema de arquivos (`file://`) não funciona.

**Live Server (VS Code)** — recomendado para desenvolvimento: instale a extensão Live Server e clique em "Go Live".

**Python:**

```bash
python -m http.server 8000
```

**Node.js:**

```bash
npx http-server -p 8000
```

Acesse `http://localhost:8000` no navegador.

## Estrutura do Projeto

```
milktur/
├── index.html           # Página principal
├── script.js            # Lógica JavaScript
├── styles.css           # Estilos CSS
├── sitemap.xml          # Sitemap para SEO
├── robots.txt           # Diretivas para crawlers
├── README.md
├── data/
│   └── viagens.json     # Dados das viagens (edite aqui para adicionar/remover)
└── assets/
    ├── imgs/
    │   ├── logos/
    │   │   └── logo-horizontal-branca.png
    │   ├── inicio.png
    │   ├── bahia.png
    │   ├── turquia.png
    │   ├── canoa-quebrada.png
    │   └── jerusalem.png
    └── pdfs/
        ├── sul-da-bahia.pdf
        ├── turquia-e-dubai.pdf
        └── semana-santa.pdf
```

## Como Adicionar Novas Viagens

1. Coloque a imagem em `assets/imgs/` e o PDF em `assets/pdfs/`
2. Edite `data/viagens.json` e adicione um objeto ao array:

```json
{
  "nome": "Nome do Destino",
  "descricao": "Descrição breve.",
  "imagem": "assets/imgs/destino.png",
  "pdf": "assets/pdfs/destino.pdf"
}
```

Use `"pdf": ""` se não houver arquivo PDF — o botão "Ver Detalhes" ficará desabilitado automaticamente.

### Suporte a imagens .webp (opcional)

Quando você converter uma imagem para `.webp`, adicione o campo `imagemWebp` no JSON:

```json
{
  "nome": "Sul da Bahia",
  "imagem": "assets/imgs/bahia.png",
  "imagemWebp": "assets/imgs/bahia.webp",
  "pdf": "assets/pdfs/sul-da-bahia.pdf"
}
```

O JS gera `<picture><source type="image/webp">` automaticamente quando o campo existir. **Importante:** só adicione `imagemWebp` quando o arquivo `.webp` de fato existir na pasta — caso contrário a imagem não aparecerá.

## Configurar EmailJS

O formulário de contato usa [EmailJS](https://emailjs.com) para enviar e-mails sem backend.

**Passos:**

1. Crie uma conta em [emailjs.com](https://emailjs.com)
2. Crie um **Email Service** (Gmail, Outlook, etc.)
3. Crie um **Email Template** com as variáveis: `{{from_name}}`, `{{from_email}}`, `{{from_phone}}`, `{{message}}`
4. Copie suas chaves e edite o topo de `script.js`:

```js
const EMAILJS_PUBLIC_KEY = "sua_public_key";
const EMAILJS_SERVICE_ID  = "seu_service_id";
const EMAILJS_TEMPLATE_ID = "seu_template_id";
```

Enquanto não configurado, o formulário exibe uma mensagem informativa e o restante do site continua funcionando normalmente.

## Configurar WhatsApp

Edite o `href` do botão flutuante em `index.html`:

```html
<a href="https://wa.me/5511999999999" ...>
```

Formato: `55` + DDD + número, sem espaços ou caracteres especiais.

## Configurar SEO

Substitua `https://seudominio.com` pelo seu domínio real em:

- `index.html` — meta canonical, og:url, og:image, twitter:image e JSON-LD
- `sitemap.xml`
- `robots.txt`

Adicione também uma imagem para compartilhamento social em `assets/imgs/og-image.png` (tamanho recomendado: 1200×630 px).

## Customização de Cores

Edite as variáveis no topo de `styles.css`:

```css
:root {
  --primary-color:   #242f60;  /* Azul escuro (navbar, footer, botões) */
  --secondary-color: #254f9c;  /* Azul médio (botões de cards) */
  --tertiary-color:  #25989c;  /* Turquesa (seção Sobre) */
}
```

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Variáveis CSS, animações, responsividade |
| JavaScript (Vanilla) | Fetch, validação, máscara, modais dinâmicos |
| Bootstrap 5 | Grid, componentes, utilitários |
| EmailJS | Envio de formulário sem backend |

---

© 2025 Milktur — Todos os direitos reservados.



