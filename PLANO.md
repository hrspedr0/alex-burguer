# Plano passo a passo: site do Alex Burguer

Cada passo tem um prompt para colar no Claude do VS Code, um critério de "pronto" e a mensagem de commit.
Faça um passo por vez, confira o resultado no navegador e só então avance. Se algo vier errado, cole o erro ou descreva o que viu e peça o ajuste antes de seguir.

## Decisões já fechadas
- Perfil comercial simulado, site de uma página, sem backend.
- Ações: pedir no WhatsApp, ver o cardápio, ir até a loja.
- Paleta 60/30/10: laranja `#F26A1B`, marrom `#2B1810`, mostarda `#FFC83D`, creme `#FFF1DC`.
- Fontes: Bricolage Grotesque (títulos) e Figtree (texto). Se quiser testar Anton nos títulos, é só trocar um token no Passo 2.
- Dados fictícios, horário proposto: terça a domingo, 18h às 23h30, segunda fechado. Mude em `js/dados.js` se quiser.

---

## Passo 0: preparar a pasta (você faz, sem o Claude)

1. Crie a pasta `alex-burguer` e abra no VS Code (`Arquivo > Abrir Pasta`).
2. Coloque dentro dela os arquivos `BRIEFING.md`, `CLAUDE.md` e este `PLANO.md`.
3. No terminal do VS Code:
   ```
   git init
   git checkout -b feat/site-inicial
   ```
4. Abra o Claude Code na pasta. Ele lê o `CLAUDE.md` automaticamente.

Pronto quando: a pasta tem os 3 arquivos e o Git mostra a branch `feat/site-inicial`.

---

## Passo 1: estrutura e Git

Prompt:
```
Leia o CLAUDE.md e o BRIEFING.md. Depois crie a estrutura inicial do projeto:
index.html (esqueleto vazio e válido, lang pt-BR, meta viewport, título e descrição provisórios),
css/tokens.css, css/componentes.css, js/dados.js, js/horario.js, js/main.js,
assets/img/ (vazia, com .gitkeep), README.md (esqueleto) e .gitignore (node_modules, .env, .DS_Store).
Ainda não escreva estilos nem conteúdo. Confira o .gitignore e faça o commit inicial.
Antes de começar, me diga em poucas linhas o que vai criar.
```
Pronto quando: a estrutura existe, o `index.html` abre em branco sem erros e há um commit.
Commit: `chore: estrutura inicial do projeto`

---

## Passo 2: sistema de design

Prompt:
```
Crie o sistema de design do Alex Burguer seguindo as decisões do CLAUDE.md.
1) css/tokens.css com variáveis por função: cores (fundo, superfície, texto, apoio, acento, destaque),
   tipografia (fonte-titulo, fonte-texto, escala fluida com clamp), espaçamento (escala única),
   raio (UM valor principal) e largura máxima.
2) DESIGN.md de uma página: direção visual em uma frase, tabela das cores com papel e contraste
   calculado (liste cada par de texto/fundo testado), fontes e por quê, valor do raio e por quê,
   a "coisa memorável" e o que ficou de fora de propósito.
3) Mostre onde a regra 60/30/10 será aplicada em cada seção da página.
Se algum par de cores não passar em 4,5:1 para texto, avise e proponha o ajuste em vez de usar assim.
```
Pronto quando: `tokens.css` preenchido, `DESIGN.md` com tabela de contraste e nenhum par abaixo de 4,5:1 para texto.
Commit: `feat: tokens de design e documentação visual`

---

## Passo 3: logo em SVG

Prompt:
```
Crie a logo do Alex Burguer em SVG, em assets/logo.svg, e uma versão compacta em assets/favicon.svg.
Conceito: a palavra "alex" em minúsculas bem pesadas, funcionando como o hambúrguer.
Pão de cima com topo arredondado e gergelim, as letras como a carne, pão de baixo reto.
"Alex Burguer" completo, pequeno, abaixo. Use as cores dos tokens (laranja, marrom, mostarda, creme).
Converta o texto em curvas (paths) para a logo não depender de fonte instalada.
Gere uma página de teste logo-teste.html mostrando a logo em fundo laranja, marrom e creme,
em tamanho grande e pequeno (32 px), para eu avaliar. Não use a logo no site ainda.
```
Pronto quando: você abre `logo-teste.html` e a logo é legível em 32 px e nos três fundos. Se não gostar, peça ajustes aqui antes de seguir. Quando aprovar, o `logo-teste.html` pode ser apagado.
Commit: `feat: logo e favicon em SVG`

---

## Passo 4: dados e a lógica do horário (com testes)

Prompt:
```
Crie js/dados.js com um único objeto exportado contendo: nome, cidade (fictícia), endereço (fictício),
whatsapp (placeholder 5500000000000), mensagem padrão do pedido, horários por dia da semana
(terça a domingo 18:00 a 23:30, segunda fechado) e o cardápio por categorias
(lanches, porções, bebidas, sobremesa) com nome, descrição curta e preço. Cardápio fictício, plausível
para hamburgueria de rua, 4 a 6 lanches. Marque tudo com // FICTÍCIO.

Crie js/horario.js com funções puras e sem acesso ao DOM:
- statusDaLoja(agora, horarios) retorna { aberta, texto } com textos como
  "Aberto até 23h30" ou "Abre hoje às 18h" ou "Abre terça às 18h".
- sempre calcule no fuso America/Sao_Paulo, não no fuso de quem acessa.
Escreva testes (node:test, rode com node --test) cobrindo: aberto, fechado antes de abrir,
fechado depois de fechar, segunda-feira, e a virada de dia perto da meia-noite.
Rode os testes e me mostre o resultado. Se eu não tiver Node instalado, me avise e proponha outra forma.
```
Pronto quando: os testes passam e você viu a saída.
Commit: `feat: dados do negócio e lógica de horário com testes`

---

## Passo 5: conteúdo e estrutura da página (ainda sem estilo final)

Prompt:
```
Monte o index.html com semântica correta (header, main, section, footer), lendo o conteúdo de js/dados.js
via js/main.js (nada de repetir preço, horário ou telefone no HTML). Seções, nesta ordem:
1) Hero: título direto sobre o produto (sem frase vazia), selo de aberto/fechado, botão "Pedir no WhatsApp".
2) Cardápio: lista com linha pontilhada até o preço, por categoria.
3) Como pedir e entrega: 3 ou 4 linhas curtas e específicas, sem inventar prazos ou taxas reais (use [FICTÍCIO]).
4) Onde estamos: endereço, horários da semana e espaço para um mapa (use um link para o Google Maps, sem iframe por enquanto).
5) Rodapé com nome, cidade e aviso "Projeto fictício para estudo".
Botão fixo de WhatsApp no celular. O link do botão usa wa.me com a mensagem padrão codificada (encodeURIComponent).
Escreva os textos em português simples, do ponto de vista de quem vai pedir. Sem estilo ainda além do básico legível.
```
Pronto quando: a página mostra tudo, o botão abre o link `wa.me` correto, o selo muda conforme o horário.
Commit: `feat: estrutura e conteúdo da página`

---

## Passo 6: componentes e visual

Prompt:
```
Agora o visual. Crie css/componentes.css usando só variáveis do tokens.css (nenhuma cor ou fonte solta).
Componentes: botão primário e secundário (com hover, :focus-visible bem visível, desativado), cabeçalho,
seção (variações laranja e marrom, alternando), item de cardápio com linha pontilhada, selo de status
(aberto em mostarda, fechado em tom neutro do sistema), rodapé, botão fixo de WhatsApp.
Aplique a regra 60/30/10 do DESIGN.md. Texto sobre laranja sempre marrom. Celular primeiro, depois desktop.
Hero com a logo no cabeçalho. Um único momento de movimento (por exemplo, o selo ao carregar) e respeite
prefers-reduced-motion. Evite tudo da lista "Evitar o visual genérico de IA" do CLAUDE.md.
Ao terminar, procure no código cores hexadecimais, px de fonte e famílias de fonte fora do tokens.css e corrija.
```
Pronto quando: a página tem a cara da marca no celular e no desktop, e a busca por valores soltos não encontra nada.
Commit: `feat: componentes e identidade visual`

---

## Passo 7: imagens

Antes: escolha 4 a 8 fotos (lanche principal, chapa, embalagem, fachada ou clima de rua, família na mesa). Use só imagens com licença livre (Unsplash, Pexels, Pixabay) ou geradas por você, e anote a fonte de cada uma. Salve em `assets/img/originais/` (essa pasta vai no `.gitignore`).

Prompt:
```
Estão em assets/img/originais/ as fotos para o site. Para cada uma:
converta para WebP em duas larguras (800 e 1600 px), com qualidade que deixe cada arquivo abaixo de ~150 KB,
salve em assets/img/. Use <picture> ou srcset com width/height definidos, loading="lazy" abaixo da dobra
(a imagem do hero com fetchpriority="high"), e alt descritivo e específico (o que se vê, não "foto de hambúrguer").
Crie CREDITOS.md com autor, fonte e licença de cada imagem (vou preencher o que faltar).
Coloque as imagens onde fizerem sentido sem virar uma grade de fotos iguais. Se faltar ferramenta para converter, me diga qual.
```
Pronto quando: as imagens aparecem, pesam pouco e todas têm `alt` e crédito.
Commit: `feat: imagens otimizadas e créditos`

---

## Passo 8: responsividade e acessibilidade

Prompt:
```
Faça uma revisão de responsividade e acessibilidade da página inteira. Teste mentalmente e, se possível, com o navegador:
320 px, 375 px, 768 px, 1280 px e 1920 px. Verifique: sem rolagem horizontal, sem texto sobreposto,
área de toque de 44 px, foco visível em tudo que é clicável, ordem de tabulação lógica, um único h1,
hierarquia de títulos, contraste dos pares reais, label e texto acessível nos botões.
Liste os problemas encontrados por gravidade, corrija os que forem seguros e me mostre o que mudou.
```
Pronto quando: lista de problemas corrigida e a página navegável só com teclado.
Commit: `fix: ajustes de responsividade e acessibilidade`

---

## Passo 9: revisão de segurança, SEO e desempenho

Prompt:
```
Antes de publicar, faça a revisão final:
1) Segurança: sem segredos no repositório, links externos com rel="noopener noreferrer", nada de innerHTML com dado não confiável
   (se o cardápio é renderizado por JS, use textContent), sem scripts de terceiros desnecessários.
2) SEO: title e meta description específicos, lang pt-BR, Open Graph com imagem, favicon, dados estruturados
   Restaurant em JSON-LD (campos fictícios marcados), robots.txt e sitemap.xml simples.
3) Desempenho: fontes com preconnect e font-display swap, CSS e JS pequenos, imagens já otimizadas.
4) Aviso claro de que é um projeto fictício, para o site não ser confundido com um negócio real.
Entregue os achados por gravidade, corrija os seguros e me diga o que ficou sem verificar.
```
Pronto quando: lista de achados resolvida e nada sensível no histórico do Git.
Commit: `chore: revisão de segurança, SEO e desempenho`

---

## Passo 10: README e publicação

Prompt:
```
Escreva o README.md: o que é o projeto (e que é fictício), como rodar localmente (abrir o index.html ou usar um servidor simples),
como rodar os testes, onde editar cardápio, horários e WhatsApp (js/dados.js), estrutura de pastas,
decisões de design (resumo, com link para o DESIGN.md) e como publicar no GitHub Pages.
Depois me guie para: subir o repositório no GitHub, abrir um Pull Request da branch feat/site-inicial para a main,
e ativar o GitHub Pages. Não faça push nem merge sem eu confirmar cada comando.
```
Pronto quando: o site abre na URL do GitHub Pages e o README permite que outra pessoa rode tudo.
Commit: `docs: README e instruções de publicação`

---

## Checklist final
- [ ] Botão de WhatsApp abre o link certo (com a mensagem pronta)
- [ ] Selo de aberto/fechado correto em horários diferentes
- [ ] Nenhuma cor, fonte ou tamanho solto fora do `tokens.css`
- [ ] Contraste de texto acima de 4,5:1
- [ ] Funciona de 320 px a desktop e só com teclado
- [ ] Imagens leves, com `alt` e créditos
- [ ] Testes passando
- [ ] Nada sensível no Git
- [ ] Aviso de projeto fictício visível

## Fase 2 (fora do escopo agora)
Pedido online com carrinho, pagamento, painel para editar o cardápio e analytics real. Só planejar depois que a fase 1 estiver publicada.
