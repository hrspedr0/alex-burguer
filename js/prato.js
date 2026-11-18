// Ponto de entrada do prato.html: monta a página do prato indicado em ?item=.

import dados from "./dados.js";
import { criar, criarEstrela, criarImagemDoPrato, montarFaixa, montarFileira, preencherCampos } from "./interface.js";
import { encontrarPrato, formatarPreco, linkPedidoDoPrato, outrosPratos } from "./pratos.js";

const DESTINO_SEM_PRATO = "index.html#cardapio";
const TAMANHO_DA_IMAGEM = "(min-width: 48em) 32.5rem, calc(100vw - 2rem)";

function campo(nome) {
  return document.querySelector(`[data-prato-${nome}]`);
}

function criarIngrediente(texto, indice) {
  const li = criar("li", "ingredientes__item");
  if (indice > 0) li.append(criarEstrela("ingredientes__estrela"));
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
  montarFaixa(document.querySelector("[data-faixa]"), dados);
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
