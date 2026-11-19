# Alex Burguer: regras do projeto

Perfil: comercial (simulado, cliente fictício)

Leia `BRIEFING.md` antes de qualquer tarefa. Ele manda no conteúdo e no escopo.

## O que é
Site de uma página (landing) de uma hamburgueria de rua em cidade pequena. Público: famílias e delivery noturno.
Ações, em ordem de prioridade: 1) pedir pelo WhatsApp, 2) ver o cardápio, 3) ir até a loja.
Fora do escopo: carrinho, pagamento online, login, blog, painel. Se eu pedir algo assim, avise que é fase 2 antes de fazer.

## Stack
HTML, CSS e JavaScript puros, sem framework e sem build. Sem dependências novas sem me avisar e justificar.
Hospedagem prevista: GitHub Pages.

## Design (decisões fechadas)
- Regra 60/30/10 por área visual: 60% laranja brasa, 30% marrom chapa, 10% mostarda. Creme só para texto sobre marrom.
- Cores: laranja `#F26A1B`, marrom `#2B1810`, mostarda `#FFC83D`, creme `#FFF1DC`.
- Texto sobre laranja é sempre marrom escuro. Nunca branco em texto pequeno (contraste insuficiente).
- Botão sobre laranja: marrom com texto creme. Botão sobre marrom: mostarda com texto marrom.
- Tipografia: títulos em Bricolage Grotesque (extra-bold), texto em Figtree, hospedadas no próprio site (`assets/fonts/`, licença OFL) com `font-display: swap`.
- Logo: a palavra "alex" em minúsculas pesadas, como o hambúrguer: pão de cima com gergelim, letras como a carne, pão de baixo. Em SVG.
- Elemento memorável: selo "aberto agora / abre às 18h" que muda pelo horário (fuso America/Sao_Paulo).
- Cardápio como lista com linha pontilhada até o preço (estilo comanda), e não grade de cards iguais.

## Regras de código
- Todas as cores, fontes, tamanhos e espaçamentos ficam em `css/tokens.css`, como variáveis por função (`--cor-acento`, não `--cor-laranja`). Nada solto em outros arquivos. Falta um valor? Acrescente ao `tokens.css` primeiro.
- Componentes em `css/componentes.css`, usando só variáveis dos tokens.
- Dados do negócio (nome, WhatsApp, horários, cardápio) em um único arquivo `js/dados.js`. Nunca repetir esses dados no HTML.
- A lógica de aberto/fechado é uma função pura em `js/horario.js`, com testes.
- Funções pequenas, nomes claros em português ou inglês, mas sem misturar no mesmo arquivo.
- Formatação com Prettier, se estiver instalado.

## Evitar o visual genérico de IA
Não usar: gradiente roxo/azul, fundo creme com acento terracota, grade de cards idênticos com sombra suave, Inter/Roboto/Arial como fonte principal, emojis no lugar de ícones, hero com título + subtítulo + dois botões genéricos, rótulo pequeno em caixa-alta antes de todo título, numeração 01/02/03 sem sequência real, animação de entrada em toda seção, textos vazios ("Soluções inovadoras").
Botões dizem o que acontece: "Pedir no WhatsApp", não "Enviar".
Movimento: selo ao carregar e pratos ao interagir (a faixa divisória corre devagar e para com mouse ou foco). Sempre respeitando `prefers-reduced-motion`.

## Piso de qualidade
- Celular primeiro. Funciona de 320 px até desktop.
- Contraste mínimo 4,5:1 no texto (3:1 no texto grande). Registrar os pares testados no `DESIGN.md`.
- Foco visível no teclado. Área de toque de pelo menos 44 px. Imagens com `alt`.
- Imagens em WebP, com largura e altura definidas, `loading="lazy"` abaixo da dobra.

## Git
- Trabalhe em branch, nunca direto na `main`. Um commit por passo do `PLANO.md`.
- Conventional Commits em português: `feat:`, `fix:`, `docs:`, `style:`, `chore:`.
- Nunca commitar segredos. Confira o `.gitignore` antes do primeiro commit.
- Nada destrutivo (`rm -rf`, `git reset --hard`, force push) sem minha confirmação.

## Dados fictícios
Nome, cidade, endereço e horários são inventados e ficam em `js/dados.js`, marcados com o comentário `// FICTÍCIO`.
O número de WhatsApp é um placeholder inválido (`5500000000000`) para não mandar mensagem a uma pessoa real.
Nunca apresentar dado inventado como real em avaliações, números ou prêmios. Sem depoimentos falsos.

## Como trabalhar comigo
Antes de cada passo, diga em 2 ou 3 linhas o que vai fazer. No fim, diga o que fez, o que testou e o que ficou sem testar.
