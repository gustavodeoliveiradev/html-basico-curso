<div align="center">

# 🌐 HTML Básico — Curso Interativo

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](.)
[![Licença](https://img.shields.io/badge/licença-MIT-blue)](LICENSE)

**Um curso modular, interativo e 100% gratuito para aprender HTML do zero.**

[▶ Começar o Curso](https://gustavodeoliveiradev.github.io/html-basico-curso/) · [📋 Roadmap](#roadmap) · [🤝 Contribuir](#contribuição)

</div>

---

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/gustavodeoliveiradev">
        <img src="https://github.com/gustavodeoliveiradev.png" width="100px;" alt="Gustavo de Oliveira" style="border-radius: 50%;"/>
        <br />
        <sub><b>Gustavo de Oliveira</b></sub>
      </a>
      <br />
      <a href="https://www.linkedin.com/in/lgustavodeoliveira/">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
      <a href="mailto:gustavodeoliveira.dev@gmail.com">
        <img src="https://img.shields.io/badge/Email-EA4335?logo=gmail&logoColor=white" alt="Email" />
      </a>
    </td>
  </tr>
</table>

---

## 📖 Sobre

Este projeto é um **curso básico de HTML** construído como uma aplicação web interativa. Cada módulo é uma página independente com teoria, exemplos visuais e exercícios práticos. O progresso do aluno é salvo no navegador via `localStorage`.

### ✨ Destaques

- 🎨 **Design moderno** — Interface clean, com dark mode e animações suaves
- 🧩 **Modular** — Cada módulo é independente, fácil de manter e expandir
- 📊 **Progresso salvo** — Acompanhe seu avanço automaticamente
- 🔒 **Sistema de desbloqueio** — Módulos desbloqueiam conforme você avança
- 📱 **Responsivo** — Funciona perfeitamente no desktop e mobile
- 🆓 **100% Gratuito** — Sem paywalls, sem anúncios

---

## 🗂️ Estrutura do Projeto

```
html-basico-curso/
├── README.md                 # Este arquivo
├── index.html                # Página inicial / hub do curso
├── css/
│   ├── base.css              # Reset, variáveis e utilitários
│   ├── layout.css            # Grid, sidebar, containers
│   ├── components.css        # Cards, botões, badges, progresso
│   └── theme.css             # Dark/light mode
├── js/
│   ├── navigation.js         # Menu mobile e navegação
│   └── progress.js           # Tracking de progresso (localStorage)
├── modules/                  # Módulos do curso (um por pasta)
│   ├── 01-introducao/
│   ├── 02-estrutura-basica/
│   ├── 03-textos-e-titulos/
│   ├── 04-links-e-navegacao/
│   ├── 05-imagens/
│   ├── 06-listas/
│   ├── 07-tabelas/
│   ├── 08-formularios/
│   └── 09-semantica-html5/
└── assets/
    ├── images/               # Screenshots e diagramas
    └── icons/                # Ícones SVG
```

---

## 🚀 Como Usar

### Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustavodeoliveiradev/html-basico-curso.git
   cd html-basico-curso
   ```

2. Abra o `index.html` no navegador:
   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

   Ou use uma extensão como **Live Server** no VS Code.

### Online

Acesse diretamente pelo GitHub Pages:

👉 **[gustavodeoliveiradev.github.io/html-basico-curso](https://gustavodeoliveiradev.github.io/html-basico-curso/)**

---

## 📋 Roadmap

| Dia | Foco | Status |
|:---:|:---|:---:|
| **Dia 1** | Estrutura base, CSS global, hub inicial | ✅ Concluído |
| **Dia 2** | Módulos 01, 02 e 03 | 🔄 Em breve |
| **Dia 3** | Módulos 04, 05 e 06 | 🔄 Em breve |
| **Dia 4** | Módulos 07 e 08 | 🔄 Em breve |
| **Dia 5** | Módulo 09 + polimentos finais + deploy | 🔄 Em breve |

### Módulos do Curso

| # | Módulo | Tempo | Status |
|:---:|:---|:---:|:---:|
| 01 | Introdução ao HTML | ~10 min | 🔄 Em breve |
| 02 | Estrutura Básica | ~15 min | 🔄 Em breve |
| 03 | Textos e Títulos | ~15 min | 🔄 Em breve |
| 04 | Links e Navegação | ~15 min | 🔄 Em breve |
| 05 | Imagens | ~10 min | 🔄 Em breve |
| 06 | Listas | ~10 min | 🔄 Em breve |
| 07 | Tabelas | ~15 min | 🔄 Em breve |
| 08 | Formulários | ~20 min | 🔄 Em breve |
| 09 | Semântica HTML5 | ~15 min | 🔄 Em breve |

---

## 🎨 Design System

| Elemento | Valor |
|:---|:---|
| **Fonte** | Inter (Google Fonts) |
| **Cores primárias** | Indigo `#6366f1` → Roxo `#8b5cf6` |
| **Border radius** | 16px (cards), 10px (botões) |
| **Sombras** | Suaves, com blur (estilo Tailwind) |
| **Animações** | fadeInUp, hover lifts, shimmer no progresso |
| **Breakpoints** | Mobile: < 1024px, Desktop: ≥ 1024px |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para sugerir melhorias:

1. Faça um **fork** do projeto
2. Crie uma **branch** (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

<div align="center">

Feito com 💜 por <a href="https://github.com/gustavodeoliveiradev"><b>Gustavo de Oliveira</b></a> · 2026

<a href="https://www.linkedin.com/in/lgustavodeoliveira/">LinkedIn</a> · <a href="mailto:gustavodeoliveira.dev@gmail.com">Email</a>

</div>
