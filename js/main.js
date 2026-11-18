// Ponto de entrada (módulo carregado no index.html).
// Preenche a página com js/dados.js: o HTML não repete nome, telefone, preço ou horário.

import dados from "./dados.js";
import { statusDaLoja, horaNaLoja, paraMinutos, formatarHora, DIAS, NOMES_DIAS } from "./horario.js";
import { criar, montarFaixa, montarFileira, preencherCampos } from "./interface.js";
import { formatarPreco, linkWhatsApp, listarPratos } from "./pratos.js";

const ORDEM_DA_SEMANA = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

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
  linha.append(criar("span", "comanda__nome", item.nome), pontos, criar("span", "comanda__preco", formatarPreco(item.preco)));
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

preencherCampos(dados);
preencherLinks();
montarFaixa(document.querySelector("[data-faixa]"), dados);
montarFileira(document.querySelector("[data-destaques]"), listarPratos(dados.cardapio));
montarCardapio(document.querySelector("[data-cardapio]"));
manterHorarioAtualizado(document.querySelector("[data-selo]"), document.querySelector("[data-horarios]"));
