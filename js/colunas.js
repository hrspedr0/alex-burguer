// Divisão de blocos em colunas. Função pura, sem acesso ao DOM.

/**
 * Coluna (0, 1, ...) de cada bloco, para que a coluna mais alta fique a menor possível.
 * Um bloco nunca é partido. Em empate, vence a primeira divisão encontrada,
 * o que mantém o primeiro bloco na coluna 0.
 * @param {number[]} alturas altura de cada bloco, na ordem do HTML
 * @param {number} colunas
 * @returns {number[]}
 */
export function dividirEmColunas(alturas, colunas = 2) {
  if (alturas.length === 0) return [];
  if (colunas <= 1) return alturas.map(() => 0);
  let melhor = null;
  let menorMaximo = Infinity;
  const atual = [];
  const somas = new Array(colunas).fill(0);

  const tentar = (i) => {
    if (Math.max(...somas) >= menorMaximo) return;
    if (i === alturas.length) {
      menorMaximo = Math.max(...somas);
      melhor = [...atual];
      return;
    }
    for (let c = 0; c < colunas; c++) {
      if (i === 0 && c > 0) break; // evita repetir divisões espelhadas
      atual[i] = c;
      somas[c] += alturas[i];
      tentar(i + 1);
      somas[c] -= alturas[i];
    }
  };
  tentar(0);
  return melhor;
}
