// Lógica pura de aberto/fechado. Sem acesso ao DOM.
// Sempre calcula no fuso da loja (America/Sao_Paulo), nunca no fuso de quem acessa.

export const FUSO = "America/Sao_Paulo";

// Chaves usadas em dados.horarios, na ordem de Date (0 = domingo).
export const DIAS = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

export const NOMES_DIAS = {
  domingo: "domingo",
  segunda: "segunda",
  terca: "terça",
  quarta: "quarta",
  quinta: "quinta",
  sexta: "sexta",
  sabado: "sábado",
};

const MINUTOS_NO_DIA = 24 * 60;
const INDICE_DIA = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const formatador = new Intl.DateTimeFormat("en-US", {
  timeZone: FUSO,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Dia da semana (0 = domingo) e minutos desde a meia-noite, no fuso da loja. */
export function horaNaLoja(agora) {
  const partes = Object.fromEntries(formatador.formatToParts(agora).map((p) => [p.type, p.value]));
  return {
    dia: INDICE_DIA[partes.weekday],
    minutos: Number(partes.hour) * 60 + Number(partes.minute),
  };
}

/** "18:30" -> 1110 */
export function paraMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** 1080 -> "18h", 1410 -> "23h30" */
export function formatarHora(minutos) {
  const h = Math.floor(minutos / 60) % 24;
  const m = minutos % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

function passaDaMeiaNoite(turno) {
  return paraMinutos(turno.fecha) <= paraMinutos(turno.abre);
}

function aberta(turno) {
  return { aberta: true, texto: `Aberto até ${formatarHora(paraMinutos(turno.fecha))}` };
}

function fechada(texto) {
  return { aberta: false, texto };
}

/**
 * Situação da loja em um instante.
 * @param {Date} agora
 * @param {Record<string, {abre: string, fecha: string} | null>} horarios chaves de DIAS
 * @returns {{aberta: boolean, texto: string}}
 */
export function statusDaLoja(agora, horarios) {
  const { dia, minutos } = horaNaLoja(agora);

  // Turno de ontem que atravessou a meia-noite e ainda não acabou.
  const ontem = horarios[DIAS[(dia + 6) % 7]];
  if (ontem && passaDaMeiaNoite(ontem) && minutos < paraMinutos(ontem.fecha)) {
    return aberta(ontem);
  }

  const hoje = horarios[DIAS[dia]];
  if (hoje) {
    const abre = paraMinutos(hoje.abre);
    const fim = passaDaMeiaNoite(hoje) ? MINUTOS_NO_DIA : paraMinutos(hoje.fecha);
    if (minutos >= abre && minutos < fim) return aberta(hoje);
    if (minutos < abre) return fechada(`Abre hoje às ${formatarHora(abre)}`);
  }

  for (let i = 1; i <= 7; i++) {
    const chave = DIAS[(dia + i) % 7];
    const turno = horarios[chave];
    if (turno) return fechada(`Abre ${NOMES_DIAS[chave]} às ${formatarHora(paraMinutos(turno.abre))}`);
  }

  return fechada("Fechado");
}
