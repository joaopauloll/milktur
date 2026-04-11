# 🌍 Milktur - Agência de Viagens

Uma agência de viagens moderna e responsiva, com pacotes de destinos nacionais e internacionais. O site apresenta as viagens disponíveis, permite visualizar detalhes em PDFs, e oferece um formulário de contato funcional.

## 📋 Tabela de Conteúdos

- [Características](#características)
- [Requisitos](#requisitos)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Adicionar Novas Viagens](#como-adicionar-novas-viagens)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## ✨ Características

- ✅ **Responsivo**: Adaptado para desktop, tablet e mobile
- ✅ **Acessível**: Suporte a leitores de tela e navegação por teclado
- ✅ **SEO Otimizado**: Meta tags e estrutura semântica
- ✅ **Validação de Formulário**: Feedback visual em tempo real
- ✅ **Navegação Suave**: Destaque automático na barra de navegação
- ✅ **Modais Dinâmicos**: Visualização de PDFs em modal fullscreen
- ✅ **Animações**: Efeitos visuais suaves e profissionais
- ✅ **Sem Dependências Backend**: Funciona completamente no navegador

## 📦 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Arquivo `index.html` e seus arquivos estáticos (CSS, JS, imagens)
- **Opcional**: Um servidor HTTP local (para desenvolvimento melhor)

## 🚀 Como Executar

### Opção 1: Abrir Direto no Navegador (Mais Simples)

1. Navegue até a pasta do projeto
2. Clique duplo em `index.html` ou
3. Arraste `index.html` para o navegador

**Desvantagem**: Alguns recursos podem não funcionar perfeitamente (como `loading="lazy"`)

### Opção 2: Usar um Servidor HTTP Local (Recomendado)

#### Com Python 3:
```bash
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

#### Com Python 2:
```bash
python -m SimpleHTTPServer 8000
```
Depois acesse: `http://localhost:8000`

#### Com Node.js (http-server):
```bash
npx http-server -p 8000
```
Depois acesse: `http://localhost:8000`

#### Com PHP:
```bash
php -S localhost:8000
```
Depois acesse: `http://localhost:8000`

## 📁 Estrutura do Projeto

```
milktur/
├── index.html          # Página principal
├── script.js           # Lógica JavaScript
├── styles.css          # Estilos CSS
├── README.md          # Este arquivo
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

## ➕ Como Adicionar Novas Viagens

### Passo 1: Adicionar Imagem e PDF

1. Coloque a imagem em `assets/imgs/` (ex: `destino.png`)
2. Coloque o PDF em `assets/pdfs/` (ex: `destino.pdf`)

### Passo 2: Editar `script.js`

Abra o arquivo `script.js` e adicione um novo objeto no array `viagens`:

```javascript
{
  nome: "Nome do Destino",
  descricao: "Descrição breve do destino",
  imagem: "assets/imgs/destino.png",
  pdf: "assets/pdfs/destino.pdf",  // Use "" se não houver PDF
}
```

**Exemplo completo:**

```javascript
const viagens = [
  {
    nome: "Sul da Bahia",
    descricao: "Porto Seguro, Trancoso e Arraial d'Ajuda te esperam!",
    imagem: "assets/imgs/bahia.png",
    pdf: "assets/pdfs/sul-da-bahia.pdf",
  },
  // ... viagens existentes ...
  
  // Adicione aqui:
  {
    nome: "Maldivas",
    descricao: "Paraíso tropical com praias de areia branca.",
    imagem: "assets/imgs/maldivas.png",
    pdf: "assets/pdfs/maldivas.pdf",
  },
];
```

### Passo 3: Salvar e Recarregar

Salve o arquivo e recarregue a página no navegador (`Ctrl+F5` ou `Cmd+Shift+R` para limpar cache).

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura semântica |
| **CSS3** | Estilos com variáveis CSS e animações |
| **JavaScript** | Lógica e interatividade (Vanilla JS, sem frameworks) |
| **Bootstrap 5** | Framework CSS para responsividade |

## 📱 Responsividade

O projeto é otimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px a 1199px
- **Mobile**: Até 767px

## ♿ Acessibilidade

- Navegação por teclado completa
- Atributos ARIA para leitores de tela
- Contraste de cores adequado
- Respeito às preferências de movimento reduzido

## 🎨 Customização

### Cores Principais

Edite o arquivo `styles.css` para mudar as cores:

```css
:root {
  --primary-color: #242f60;      /* Azul principal */
  --secondary-color: #254f9c;    /* Azul secundário */
  --tertiary-color: #25989c;     /* Turquesa */
}
```

### Informações de Contato

As informações de contato ainda não possuem integração com backend. Para implementar:

1. Configure um endpoint backend para receber o formulário
2. Atualize o evento `submit` em `script.js` para enviar os dados

## 📧 Contato e Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato através do formulário no site ou abra uma issue.

## 📄 Licença

© 2025 Milktur - Todos os direitos reservados.

---

**Desenvolvido com ❤️ para oferecer as melhores experiências de viagem.**
