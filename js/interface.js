// Peças de interface usadas pelo index.html e pelo prato.html.
// Todo texto entra por textContent.

import { linkDoPrato } from "./pratos.js";

const TAMANHO_NA_FILEIRA = "(min-width: 60em) 13rem, (min-width: 48em) 30vw, 45vw";
const SVG = "http://www.w3.org/2000/svg";
const FORMA_DA_ESTRELA = "M12 2l3 6.6 7.2.8-5.4 4.8 1.5 7.1-6.3-3.6-6.3 3.6 1.5-7.1-5.4-4.8 7.2-.8z";
const GRUPOS_DA_FAIXA = 8; // cópias suficientes para cobrir telas muito largas

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

export function criarEstrela(classe) {
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("class", classe);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const forma = document.createElementNS(SVG, "path");
  forma.setAttribute("d", FORMA_DA_ESTRELA);
  svg.append(forma);
  return svg;
}

function criarGrupoDaFaixa(frases, copia) {
  const grupo = criar("ul", "faixa__grupo");
  if (copia) grupo.setAttribute("aria-hidden", "true");
  grupo.append(
    ...frases.map((frase) => {
      const item = criar("li", "faixa__item", frase);
      item.append(criarEstrela("faixa__estrela"));
      return item;
    }),
  );
  return grupo;
}

/** A primeira lista é lida pelo leitor de tela; as cópias só completam o movimento. */
export function montarFaixa(container, dados) {
  const frases = [...dados.chamadas, dados.cidade];
  const trilha = criar("div", "faixa__trilha");
  for (let i = 0; i < GRUPOS_DA_FAIXA; i++) trilha.append(criarGrupoDaFaixa(frases, i > 0));
  container.append(trilha);
  // Com movimento, o foco pelo teclado é a forma de pausar a faixa.
  if (matchMedia("(prefers-reduced-motion: no-preference)").matches) container.tabIndex = 0;
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
