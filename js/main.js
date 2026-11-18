// Ponto de entrada (módulo carregado no index.html).
// Preenche a página com js/dados.js: o HTML não repete nome, telefone, preço ou horário.

import dados from "./dados.js";
import { statusDaLoja, horaNaLoja, paraMinutos, formatarHora, DIAS, NOMES_DIAS } from "./horario.js";

const ORDEM_DA_SEMANA = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
const TAMANHO_PRATO = "(min-width: 60em) 13rem, (min-width: 48em) 30vw, 45vw";
const formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function linkWhatsApp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

function linkMapa(endereco, cidade) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${endereco}, ${cidade}`)}`;
}

function textoDoTurno(turno) {
  if (!turno) return "Fechado";
  return `${formatarHora(paraMinutos(turno.abre))} às ${formatarHora(paraMinutos(turno.fecha))}`;
}

function comMaiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function preencherCampos() {
  document.querySelectorAll("[data-campo]").forEach((elemento) => {
    elemento.textContent = dados[elemento.dataset.campo];
  });
}

function preencherLinks() {
  const whatsapp = linkWhatsApp(dados.whatsapp, dados.mensagemPedido);
  const mapa = linkMapa(dados.endereco, dados.cidade);
  document.querySelectorAll('[data-link="whatsapp"]').forEach((link) => (link.href = whatsapp));
  document.querySelectorAll('[data-link="mapa"]').forEach((link) => (link.href = mapa));
}

function criarItemDoCardapio(item) {
  const li = criar("li", "comanda__item");
  const linha = criar("p", "comanda__linha");
  const pontos = criar("span", "comanda__pontos");
  pontos.setAttribute("aria-hidden", "true");
  linha.append(criar("span", "comanda__nome", item.nome), pontos, criar("span", "comanda__preco", formatoPreco.format(item.preco)));
  li.append(linha, criar("p", "comanda__descricao", item.descricao));
  return li;
}

function montarCardapio(container) {
  dados.cardapio.forEach(({ categoria, itens }, indice) => {
    const id = `categoria-${indice}`;
    const bloco = criar("section", "comanda");
    bloco.setAttribute("aria-labelledby", id);
    const titulo = criar("h3", "comanda__categoria", categoria);
    titulo.id = id;
    const lista = criar("ul", "comanda__lista");
    lista.append(...itens.map(criarItemDoCardapio));
    bloco.append(titulo, lista);
    container.append(bloco);
  });
}

function criarImagemDoPrato({ imagem, menor, largura, altura, alt }) {
  const caminho = `assets/img/${imagem}`;
  const elemento = criar("img", "destaque__imagem");
  elemento.loading = "lazy";
  elemento.decoding = "async";
  elemento.width = largura;
  elemento.height = altura;
  elemento.sizes = TAMANHO_PRATO;
  elemento.srcset = `${caminho}-480.webp ${menor}w, ${caminho}.webp ${largura}w`;
  elemento.src = `${caminho}.webp`;
  elemento.alt = alt;
  return elemento;
}

function criarDestaque({ nome, destaque }) {
  const li = criar("li", "destaque");
  li.append(criarImagemDoPrato(destaque), criar("h3", "destaque__nome", nome), criar("p", "destaque__frase", destaque.frase));
  return li;
}

function montarDestaques(container) {
  const itens = dados.cardapio.flatMap(({ itens }) => itens).filter((item) => item.destaque);
  container.append(...itens.map(criarDestaque));
}

function montarHorarios(container, agora) {
  const hoje = DIAS[horaNaLoja(agora).dia];
  const linhas = ORDEM_DA_SEMANA.map((chave) => {
    const linha = criar("div", chave === hoje ? "horarios__dia horarios__dia--hoje" : "horarios__dia");
    const nome = comMaiuscula(NOMES_DIAS[chave]) + (chave === hoje ? " (hoje)" : "");
    linha.append(criar("dt", "", nome), criar("dd", "", textoDoTurno(dados.horarios[chave])));
    return linha;
  });
  container.replaceChildren(...linhas);
}

function atualizarSelo(selo, agora) {
  const { aberta, texto } = statusDaLoja(agora, dados.horarios);
  if (selo.textContent !== texto) selo.textContent = texto;
  selo.dataset.aberta = aberta ? "sim" : "nao";
}

// Selo e "hoje" dos horários: atualizados na virada de cada minuto e quando a aba volta a ficar visível.
function manterHorarioAtualizado(selo, horarios) {
  const atualizar = () => {
    const agora = new Date();
    atualizarSelo(selo, agora);
    montarHorarios(horarios, agora);
  };
  const proximoMinuto = () => {
    atualizar();
    setTimeout(proximoMinuto, 60000 - (Date.now() % 60000));
  };
  proximoMinuto();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) atualizar();
  });
}

preencherCampos();
preencherLinks();
montarDestaques(document.querySelector("[data-destaques]"));
montarCardapio(document.querySelector("[data-cardapio]"));
manterHorarioAtualizado(document.querySelector("[data-selo]"), document.querySelector("[data-horarios]"));
