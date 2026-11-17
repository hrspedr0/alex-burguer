// Testes da lógica de horário. Rodar com: node --test
// Os instantes têm fuso explícito, então o resultado não depende do fuso da máquina.
// Referência: 16/11/2026 é segunda-feira; 17/11/2026 é terça.

import { test } from "node:test";
import assert from "node:assert/strict";
import { statusDaLoja, formatarHora } from "../js/horario.js";
import dados from "../js/dados.js";

const horarios = dados.horarios;
const sp = (dataHora) => new Date(`${dataHora}-03:00`); // horário de Brasília

test("aberto: terça 20h", () => {
  assert.deepEqual(statusDaLoja(sp("2026-11-17T20:00:00"), horarios), {
    aberta: true,
    texto: "Aberto até 23h30",
  });
});

test("aberto exatamente na hora de abrir: terça 18h00", () => {
  assert.equal(statusDaLoja(sp("2026-11-17T18:00:00"), horarios).aberta, true);
});

test("fechado antes de abrir: terça 15h", () => {
  assert.deepEqual(statusDaLoja(sp("2026-11-17T15:00:00"), horarios), {
    aberta: false,
    texto: "Abre hoje às 18h",
  });
});

test("fechado depois de fechar: terça 23h45 abre quarta", () => {
  assert.deepEqual(statusDaLoja(sp("2026-11-17T23:45:00"), horarios), {
    aberta: false,
    texto: "Abre quarta às 18h",
  });
});

test("fecha exatamente às 23h30", () => {
  assert.equal(statusDaLoja(sp("2026-11-17T23:30:00"), horarios).aberta, false);
});

test("segunda-feira à noite está fechado e abre terça", () => {
  assert.deepEqual(statusDaLoja(sp("2026-11-16T20:00:00"), horarios), {
    aberta: false,
    texto: "Abre terça às 18h",
  });
});

test("domingo depois de fechar pula a segunda", () => {
  assert.equal(statusDaLoja(sp("2026-11-15T23:50:00"), horarios).texto, "Abre terça às 18h");
});

test("virada de dia: quarta 00h10 em Brasília abre hoje às 18h", () => {
  assert.deepEqual(statusDaLoja(sp("2026-11-18T00:10:00"), horarios), {
    aberta: false,
    texto: "Abre hoje às 18h",
  });
});

test("virada de dia: 02h15 UTC de quarta ainda é terça 23h15 em Brasília (aberto)", () => {
  assert.deepEqual(statusDaLoja(new Date("2026-11-18T02:15:00Z"), horarios), {
    aberta: true,
    texto: "Aberto até 23h30",
  });
});

test("virada de dia: 02h45 UTC de quarta é terça 23h45 em Brasília (fechado)", () => {
  assert.equal(statusDaLoja(new Date("2026-11-18T02:45:00Z"), horarios).texto, "Abre quarta às 18h");
});

test("turno que passa da meia-noite continua aberto no dia seguinte", () => {
  const tarde = { ...horarios, sexta: { abre: "18:00", fecha: "02:00" } };
  assert.deepEqual(statusDaLoja(sp("2026-11-21T01:00:00"), tarde), { aberta: true, texto: "Aberto até 2h" });
  assert.equal(statusDaLoja(sp("2026-11-20T23:59:00"), tarde).aberta, true);
});

test("sem nenhum dia com horário: Fechado", () => {
  const nenhum = Object.fromEntries(Object.keys(horarios).map((d) => [d, null]));
  assert.deepEqual(statusDaLoja(sp("2026-11-17T20:00:00"), nenhum), { aberta: false, texto: "Fechado" });
});

test("formatarHora", () => {
  assert.equal(formatarHora(18 * 60), "18h");
  assert.equal(formatarHora(23 * 60 + 30), "23h30");
  assert.equal(formatarHora(9 * 60 + 5), "9h05");
});
