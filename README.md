# Alex Burguer

Site de uma hamburgueria de rua **fictícia**, feito como **projeto de portfólio**. O negócio, o endereço, o telefone, os horários e os preços são inventados, e o site avisa isso no rodapé. As imagens dos pratos foram geradas por IA (veja [CREDITOS.md](CREDITOS.md)).

Endereço previsto: https://hrspedr0.github.io/alex-burguer/ (ainda não publicado)

## O que tem

- **Página inicial** (`index.html`): hero com selo de aberto/fechado que muda pelo horário de Brasília, fileira com 5 pratos, cardápio completo no estilo comanda, como pedir, endereço e horários.
- **Página do prato** (`prato.html?item=alex-classico`): um modelo único que monta cada prato a partir dos dados, com ingredientes e pedido pelo WhatsApp com a mensagem pronta.
- **Página 404** (`404.html`) para endereços que não existem.
- Pedido pelo WhatsApp por link `wa.me`, sem formulário, sem banco de dados e sem coleta de dados pessoais.

HTML, CSS e JavaScript puros, sem framework, sem etapa de build e sem nenhuma dependência.

## Como rodar

Os scripts são módulos ES, então o navegador não os carrega abrindo o `index.html` com duplo clique (`file://`). Sirva a pasta por HTTP:

- **VS Code:** instale a extensão **Live Server**, clique com o botão direito no `index.html` e escolha "Open with Live Server".
- **Terminal:** `python -m http.server 8000` e abra http://localhost:8000.

## Como testar

```
npm test
```

Roda os testes com o `node:test` (Node 18 ou mais novo), sem instalar nada:

- `testes/horario.test.js`: aberto/fechado no fuso America/Sao_Paulo, inclusive na virada de dia.
- `testes/pratos.test.js`: busca do prato pelo id (com ids inválidos e maliciosos) e link do WhatsApp (com caracteres especiais).
- `testes/colunas.test.js`: divisão das categorias do cardápio em duas colunas equilibradas.

## Como editar o conteúdo

Tudo o que é dado do negócio fica em **`js/dados.js`**: nome, cidade, endereço, WhatsApp, frases da faixa, horários e cardápio. O HTML não repete esses dados.

- **Preço:** em reais, com ponto (`24.9` = R$ 24,90).
- **Horário:** `{ abre: "18:00", fecha: "23:30" }`, ou `null` para fechado.
- **Prato com página e imagem:** precisa de `id`, `artigo`, `ingredientes` (trechos da descrição) e `destaque`, com a imagem em `assets/img`.
- **WhatsApp:** o número atual (`5500000000000`) é um placeholder inválido de propósito, para não enviar mensagem a ninguém.

## Estrutura

```
index.html            página inicial
prato.html            modelo da página de cada prato (?item=id)
404.html              página de erro (usa caminhos com /alex-burguer/)
robots.txt            não bloqueia nada; o noindex está nas páginas
css/
  tokens.css          cores, fontes, tamanhos e espaçamentos (única fonte desses valores)
  componentes.css     componentes, só com variáveis do tokens.css
js/
  dados.js            dados do negócio (fictícios)
  horario.js          aberto/fechado, função pura
  pratos.js           busca do prato, links e preço, funções puras
  colunas.js          divisão em colunas, função pura
  interface.js        peças comuns às duas páginas (fileira, faixa, botão fixo)
  main.js             página inicial
  prato.js            página do prato
testes/               testes com node:test
assets/
  fonts/              fontes WOFF2 e licenças OFL
  img/                imagens dos pratos em WebP (900 px e 480 px)
  logo*.svg, favicon.svg
  compartilhar.jpg    imagem de compartilhamento (1200×630)
BRIEFING.md           briefing do cliente simulado
DESIGN.md             sistema de design, contrastes e decisões
PLANO.md              plano passo a passo do projeto
CREDITOS.md           origem das imagens e das fontes
```

## Decisões de design (resumo)

A direção visual é "a chapa acesa à noite numa esquina de bairro".

- **Cores:** laranja, marrom e mostarda na proporção 60/30/10. Sobre o laranja, o texto é sempre marrom.
- **Fontes:** Bricolage Grotesque nos títulos e Figtree no texto.
- **Cardápio:** lista com linha pontilhada até o preço, em vez de grade de cards.
- **Movimento:** o selo anima ao carregar, os pratos reagem ao mouse e à pressão, e a faixa corre devagar. Tudo fica parado com `prefers-reduced-motion`.

Detalhes, contrastes medidos e o que ficou de fora de propósito estão no [DESIGN.md](DESIGN.md).

## Acessibilidade, segurança e SEO

- **Acessibilidade:** testado de 320 px a 1440 px e só com teclado (Tab e Enter), com foco visível, áreas de toque de 44 px e um `h1` por página.
- **Segurança:** conteúdo inserido só com `textContent`. O `?item=` é validado contra os ids existentes; se for inválido, a página volta ao cardápio. Há uma Content-Security-Policy por `<meta>` e nenhum recurso de terceiros, porque as fontes ficam no próprio site.
- **SEO:** título, descrição, canonical e Open Graph em cada página, todas com **`noindex`**. É um negócio fictício, então não deve aparecer em buscas.

## Como publicar (GitHub Pages)

1. Envie o repositório para o GitHub com o nome `alex-burguer`.
2. Em **Settings → Pages**, escolha "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. O site fica em `https://<usuario>.github.io/alex-burguer/`. Se o nome do repositório ou o usuário forem outros, atualize os endereços em:
   - `index.html` e `prato.html`: canonical, `og:url` e `og:image`;
   - `js/prato.js`: `ENDERECO_DO_SITE`;
   - `404.html`: os caminhos `/alex-burguer/`.

Todos os outros caminhos são relativos, então funcionam no subcaminho do repositório.
