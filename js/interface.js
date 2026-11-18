// Peças de interface usadas pelo index.html e pelo prato.html.
// Todo texto entra por textContent.

import { linkDoPrato } from "./pratos.js";

const TAMANHO_NA_FILEIRA = "(min-width: 60em) 13rem, (min-width: 48em) 30vw, 45vw";

export function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

export function preencherCampos(dados) {
  document.querySelectorAll("[data-campo]").forEach((elemento) => {
    elemento.textContent = dados[elemento.dataset.campo];
  });
}

export function criarImagemDoPrato({ imagem, menor, largura, altura, alt }, { classe, tamanhos, prioritaria = false }) {
  const caminho = `assets/img/${imagem}`;
  const elemento = criar("img", classe);
  if (prioritaria) elemento.fetchPriority = "high";
  else elemento.loading = "lazy";
  elemento.decoding = "async";
  elemento.width = largura;
  elemento.height = altura;
  elemento.sizes = tamanhos;
  elemento.srcset = `${caminho}-480.webp ${menor}w, ${caminho}.webp ${largura}w`;
  elemento.src = `${caminho}.webp`;
  elemento.alt = alt;
  return elemento;
}

function criarItemDaFileira({ id, nome, destaque }) {
  const li = criar("li", "destaque");
  const titulo = criar("h3", "destaque__nome");
  const link = criar("a", "destaque__link", nome);
  link.href = linkDoPrato(id);
  titulo.append(link);
  li.append(
    criarImagemDoPrato(destaque, { classe: "destaque__imagem", tamanhos: TAMANHO_NA_FILEIRA }),
    titulo,
    criar("p", "destaque__frase", destaque.frase),
  );
  return li;
}

export function montarFileira(container, pratos) {
  container.append(...pratos.map(criarItemDaFileira));
  // Em alguns celulares, o :active só funciona com um ouvinte de toque na página.
  document.addEventListener("touchstart", () => {}, { passive: true });
}
