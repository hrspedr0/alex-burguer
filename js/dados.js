// Dados do negócio: fonte única. O HTML nunca repete estes valores.
// Tudo aqui é inventado para estudo, marcado com // FICTÍCIO.
// Para editar o cardápio: mude nome, descrição ou preço (em reais, com ponto: 24.9 = R$ 24,90).

const dados = {
  nome: "Alex Burguer",
  cidade: "Serra da Brasa (MG)", // FICTÍCIO
  endereco: "Rua Sete de Setembro, 245, Centro", // FICTÍCIO
  whatsapp: "5500000000000", // FICTÍCIO: placeholder inválido de propósito
  mensagemPedido: "Olá, Alex Burguer! Quero fazer um pedido:", // FICTÍCIO

  // Horários no fuso America/Sao_Paulo. null = fechado. // FICTÍCIO
  horarios: {
    domingo: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
    segunda: null, // FICTÍCIO
    terca: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
    quarta: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
    quinta: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
    sexta: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
    sabado: { abre: "18:00", fecha: "23:30" }, // FICTÍCIO
  },

  // Cardápio por categoria, na ordem em que aparece na página. // FICTÍCIO
  cardapio: [
    {
      categoria: "Lanches",
      itens: [
        { nome: "Alex Clássico", descricao: "Pão brioche, carne de 120 g na chapa, queijo, alface, tomate e molho da casa.", preco: 24.9 }, // FICTÍCIO
        { nome: "Alex Bacon", descricao: "Carne de 120 g, cheddar, bacon crocante e cebola caramelizada.", preco: 29.9 }, // FICTÍCIO
        { nome: "Alex Duplo", descricao: "Duas carnes de 90 g, queijo prato em dobro, picles e molho da casa.", preco: 32.9 }, // FICTÍCIO
        { nome: "Alex Tudo", descricao: "Carne de 150 g, ovo, bacon, presunto, queijo, alface, tomate e milho.", preco: 34.9 }, // FICTÍCIO
        { nome: "Alex Frango", descricao: "Filé de frango empanado, alface, tomate e maionese de ervas.", preco: 26.9 }, // FICTÍCIO
        { nome: "Alex Kids", descricao: "Pão menor, carne de 90 g, queijo e ketchup.", preco: 18.9 }, // FICTÍCIO
      ],
    },
    {
      categoria: "Porções",
      itens: [
        { nome: "Batata frita", descricao: "300 g, sequinha e com sal na medida.", preco: 18.9 }, // FICTÍCIO
        { nome: "Batata com cheddar e bacon", descricao: "300 g de batata coberta com cheddar cremoso e bacon.", preco: 26.9 }, // FICTÍCIO
        { nome: "Anéis de cebola", descricao: "Empanados e crocantes, com molho barbecue.", preco: 22.9 }, // FICTÍCIO
      ],
    },
    {
      categoria: "Bebidas",
      itens: [
        { nome: "Refrigerante lata", descricao: "350 ml, vários sabores.", preco: 6 }, // FICTÍCIO
        { nome: "Refrigerante 2 litros", descricao: "Para a mesa da família.", preco: 14 }, // FICTÍCIO
        { nome: "Suco natural", descricao: "500 ml, laranja ou limão.", preco: 9 }, // FICTÍCIO
        { nome: "Água mineral", descricao: "500 ml, com ou sem gás.", preco: 4 }, // FICTÍCIO
      ],
    },
    {
      categoria: "Sobremesa",
      itens: [
        { nome: "Brownie com sorvete", descricao: "Brownie quente com uma bola de sorvete de creme.", preco: 16.9 }, // FICTÍCIO
        { nome: "Milk-shake", descricao: "400 ml, chocolate, morango ou baunilha.", preco: 17.9 }, // FICTÍCIO
      ],
    },
  ],
};

export default dados;
