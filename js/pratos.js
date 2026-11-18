// Regras dos pratos com página própria. Funções puras, sem acesso ao DOM.

const formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(valor) {
  return formatoPreco.format(valor);
}

/** Itens do cardápio que têm id e imagem, na ordem em que aparecem. */
export function listarPratos(cardapio) {
  return cardapio.flatMap(({ itens }) => itens).filter((item) => item.id && item.destaque);
}

/** Compara o valor recebido com os ids existentes. Sem correspondência exata, devolve null. */
export function encontrarPrato(cardapio, id) {
  if (typeof id !== "string" || id === "") return null;
  return listarPratos(cardapio).find((prato) => prato.id === id) ?? null;
}

export function outrosPratos(cardapio, id) {
  return listarPratos(cardapio).filter((prato) => prato.id !== id);
}

export function linkDoPrato(id) {
  return `prato.html?item=${encodeURIComponent(id)}`;
}

export function linkWhatsApp(numero, mensagem) {
  const soDigitos = String(numero).replace(/\D/g, "");
  return `https://wa.me/${soDigitos}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemDoPrato({ artigo, nome }) {
  return `Olá! Quero pedir ${artigo} ${nome}.`;
}

/** Link de pedido do prato com este id, ou null se o id não existir. */
export function linkPedidoDoPrato(dados, id) {
  const prato = encontrarPrato(dados.cardapio, id);
  return prato ? linkWhatsApp(dados.whatsapp, mensagemDoPrato(prato)) : null;
}
