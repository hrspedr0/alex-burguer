// Testes da divisão em colunas. Rodar com: node --test

import { test } from "node:test";
import assert from "node:assert/strict";
import { dividirEmColunas } from "../js/colunas.js";

const maiorColuna = (alturas, divisao, colunas = 2) =>
  Math.max(...Array.from({ length: colunas }, (_, c) => alturas.reduce((s, a, i) => s + (divisao[i] === c ? a : 0), 0)));

test("lista vazia e coluna única", () => {
  assert.deepEqual(dividirEmColunas([]), []);
  assert.deepEqual(dividirEmColunas([10, 20], 1), [0, 0]);
});

test("cada bloco vai para uma coluna existente", () => {
  const d = dividirEmColunas([5, 9, 3, 7, 2]);
  assert.equal(d.length, 5);
  assert.ok(d.every((c) => c === 0 || c === 1));
  assert.equal(d[0], 0);
});

test("encontra a divisão mais equilibrada", () => {
  // Alturas parecidas com as do cardápio no desktop: Lanches, Porções, Bebidas, Sobremesa
  const alturas = [680, 300, 330, 220];
  const d = dividirEmColunas(alturas);
  assert.equal(maiorColuna(alturas, d), 850);
});

test("não piora o equilíbrio em relação a nenhuma outra divisão", () => {
  const alturas = [120, 340, 90, 410, 200, 60];
  const melhor = maiorColuna(alturas, dividirEmColunas(alturas));
  for (let m = 0; m < 2 ** alturas.length; m++) {
    const d = alturas.map((_, i) => (m >> i) & 1);
    assert.ok(melhor <= maiorColuna(alturas, d));
  }
});

test("blocos iguais ficam meio a meio", () => {
  const d = dividirEmColunas([100, 100, 100, 100]);
  assert.equal(d.filter((c) => c === 0).length, 2);
});

test("três colunas", () => {
  const alturas = [300, 300, 300];
  assert.equal(maiorColuna(alturas, dividirEmColunas(alturas, 3), 3), 300);
});
