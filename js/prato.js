// Ponto de entrada do prato.html: monta a página do prato indicado em ?item=.

import dados from "./dados.js";
import { criar, criarImagemDoPrato, montarFileira, preencherCampos } from "./interface.js";
import { encontrarPrato, formatarPreco, linkPedidoDoPrato, outrosPratos } from "./pratos.js";

const DESTINO_SEM_PRATO = "index.html#cardapio";
const TAMANHO_DA_IMAGEM = "(min-width: 48em) 32.5rem, calc(100vw - 2rem)";
const SVG = "http://www.w3.org/2000/svg";
const FORMA_DA_ESTRELA = "M12 2l3 6.6 7.2.8-5.4 4.8 1.5 7.1-6.3-3.6-6.3 3.6 1.5-7.1-5.4-4.8 7.2-.8z";

function campo(nome) {
  return document.querySelector(`[data-prato-${nome}]`);
}

function criarEstrela() {
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("class", "ingredientes__estrela");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const forma = document.createElementNS(SVG, "path");
  forma.setAttribute("d", FORMA_DA_ESTRELA);
  svg.append(forma);
  return svg;
}

function criarIngrediente(texto, indice) {
  const li = criar("li", "ingredientes__item");
  if (indice > 0) li.append(criarEstrela());
  li.append(criar("span", "", texto));
  return li;
}

function atualizarCabecalhoDoDocumento(prato) {
  document.title = `${prato.nome} | ${dados.nome}`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", `${prato.nome}: ${prato.descricao} ${dados.nome}, ${dados.cidade}.`);
}

function montarPagina(prato) {
  atualizarCabecalhoDoDocumento(prato);
  preencherCampos(dados);
  campo("imagem").append(
    criarImagemDoPrato(prato.destaque, { classe: "detalhe__imagem", tamanhos: TAMANHO_DA_IMAGEM, prioritaria: true }),
  );
  campo("nome").textContent = prato.nome;
  campo("descricao").textContent = prato.descricao;
  campo("preco").textContent = formatarPreco(prato.preco);
  campo("ingredientes").append(...prato.ingredientes.map(criarIngrediente));
  campo("pedido").href = linkPedidoDoPrato(dados, prato.id);
  montarFileira(campo("outros"), outrosPratos(dados.cardapio, prato.id));
  document.querySelector("main").hidden = false;
}

const prato = encontrarPrato(dados.cardapio, new URLSearchParams(location.search).get("item"));
if (prato) montarPagina(prato);
else location.replace(DESTINO_SEM_PRATO);
