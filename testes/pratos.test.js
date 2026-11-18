// Testes dos pratos com página própria. Rodar com: node --test

import { test } from "node:test";
import assert from "node:assert/strict";
import dados from "../js/dados.js";
import {
  encontrarPrato,
  linkDoPrato,
  linkPedidoDoPrato,
  linkWhatsApp,
  listarPratos,
  mensagemDoPrato,
  outrosPratos,
} from "../js/pratos.js";

const { cardapio } = dados;
const textoDaMensagem = (link) => decodeURIComponent(link.split("?text=")[1]);

test("encontra o prato pelo id", () => {
  assert.equal(encontrarPrato(cardapio, "alex-classico").nome, "Alex Clássico");
  assert.equal(encontrarPrato(cardapio, "milk-shake").nome, "Milk-shake");
});

test("id inválido ou ausente devolve null", () => {
  const invalidos = ["", "nao-existe", "ALEX-CLASSICO", " alex-classico", "alex-classico/", "__proto__", "constructor", "toString", "<img src=x onerror=alert(1)>", "../index", null, undefined, 1, {}, ["alex-classico"]];
  for (const id of invalidos) assert.equal(encontrarPrato(cardapio, id), null, String(id));
});

test("item do cardápio sem página não é encontrado", () => {
  assert.equal(encontrarPrato(cardapio, "Alex Bacon"), null);
  assert.equal(encontrarPrato(cardapio, "alex-bacon"), null);
});

test("são 5 pratos, com ids únicos e seguros para URL", () => {
  const ids = listarPratos(cardapio).map(({ id }) => id);
  assert.equal(ids.length, 5);
  assert.equal(new Set(ids).size, 5);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test("todo ingrediente sai do texto da descrição", () => {
  for (const { nome, descricao, ingredientes } of listarPratos(cardapio)) {
    assert.ok(ingredientes.length > 0, nome);
    for (const ingrediente of ingredientes) {
      assert.ok(descricao.toLowerCase().includes(ingrediente.toLowerCase()), `${nome}: ${ingrediente}`);
    }
  }
});

test("outros pratos não incluem o atual", () => {
  const outros = outrosPratos(cardapio, "batata-frita").map(({ id }) => id);
  assert.equal(outros.length, 4);
  assert.ok(!outros.includes("batata-frita"));
});

test("link do prato usa o parâmetro item", () => {
  assert.equal(linkDoPrato("alex-duplo"), "prato.html?item=alex-duplo");
  assert.equal(linkDoPrato("a b&c"), "prato.html?item=a%20b%26c");
});

test("mensagem cita o prato com o artigo certo", () => {
  assert.equal(mensagemDoPrato(encontrarPrato(cardapio, "alex-classico")), "Olá! Quero pedir o Alex Clássico.");
  assert.equal(mensagemDoPrato(encontrarPrato(cardapio, "batata-frita")), "Olá! Quero pedir a Batata frita.");
});

test("link do WhatsApp usa o número e codifica a mensagem", () => {
  assert.equal(
    linkPedidoDoPrato(dados, "alex-classico"),
    "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20pedir%20o%20Alex%20Cl%C3%A1ssico.",
  );
});

test("caracteres especiais não quebram o link do WhatsApp", () => {
  const mensagem = 'Pão & "queijo" 100% + molho? #1\nação=sim';
  const link = linkWhatsApp("5500000000000", mensagem);
  const url = new URL(link);
  assert.equal(url.hash, "");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  assert.equal(textoDaMensagem(link), mensagem);
});

test("o número do WhatsApp fica só com dígitos", () => {
  assert.equal(linkWhatsApp("+55 (00) 0000-0000/evil?x=1", "oi"), "https://wa.me/5500000000001?text=oi");
});

test("id inválido não gera link de pedido", () => {
  for (const id of ["nao-existe", "", "__proto__", null, undefined]) assert.equal(linkPedidoDoPrato(dados, id), null);
});
