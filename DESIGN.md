# Alex Burguer: sistema de design

**Direção visual:** a chapa acesa à noite numa esquina de bairro: laranja de brasa, marrom de chapa queimada, mostarda de bisnaga, com letreiro pesado e cardápio de comanda.

Os valores vivem em `css/tokens.css`. Este arquivo explica o porquê.

## Cores

| Token | Cor | Papel | Proporção |
|---|---|---|---|
| `--cor-fundo` | `#F26A1B` laranja brasa | fundo das áreas principais | 60% |
| `--cor-superficie` | `#2B1810` marrom chapa | faixas, blocos, botões sobre o laranja | 30% |
| `--cor-acento` | `#FFC83D` mostarda | botão sobre marrom, selo, etiqueta de preço | 10% |
| `--cor-texto` | `#2B1810` | texto sobre laranja e sobre mostarda | - |
| `--cor-texto-inverso` | `#FFF1DC` creme | texto sobre marrom (só aí) | - |
| `--cor-apoio` | `#C9AE8C` kraft | texto secundário sobre marrom | - |
| `--cor-destaque` | `#F26A1B` | realce de texto dentro de áreas marrons | - |

### Pares testados (WCAG 2.x, calculados por script)

| Texto / elemento | Fundo | Contraste | Resultado | Uso |
|---|---|---|---|---|
| marrom `#2B1810` | laranja `#F26A1B` | 5,52:1 | passa AA | texto corrido, títulos, **descrições do cardápio** (`--texto-menor`), **frase da fileira de pratos** (`--texto-frase-prato`, peso 500), **descrição, ingredientes e link de voltar da página do prato**, pontilhado, foco |
| creme `#FFF1DC` | marrom `#2B1810` | 15,21:1 | passa AAA | texto em faixas marrons, **faixa divisória** (`--texto-faixa`, caixa-alta), botão sobre laranja, dia de hoje nos horários |
| mostarda `#FFC83D` | marrom `#2B1810` | 10,94:1 | passa AAA | preço/realce em áreas marrons, estrela da faixa divisória, foco sobre marrom |
| marrom `#2B1810` | mostarda `#FFC83D` | 10,94:1 | passa AAA | texto do botão mostarda, selo, etiqueta de preço, quadro de horários |
| kraft `#C9AE8C` | marrom `#2B1810` | 7,99:1 | passa AAA | **aviso do rodapé** (`--texto-menor`) |
| laranja `#F26A1B` | marrom `#2B1810` | 5,52:1 | passa AA | destaque de texto dentro de área marrom |
| creme `#FFF1DC` | laranja `#F26A1B` | 2,75:1 | **reprovado** | proibido |
| branco `#FFFFFF` | laranja `#F26A1B` | 3,06:1 | **reprovado** para texto normal | proibido (regra do projeto) |
| mostarda `#FFC83D` | laranja `#F26A1B` | 1,98:1 | **reprovado** até para borda (3:1) | proibido; mostarda sobre laranja só com borda marrom |
| `#4A2A1A` / `#5C3422` | laranja | 4,19 / 3,48:1 | **reprovado** | descartados como "apoio" sobre laranja |

Consequência: **sobre o laranja só existe uma cor de texto, o marrom**. A hierarquia ali vem de tamanho e peso, não de um cinza mais claro.

## Tipografia

- **Bricolage Grotesque 800** (`--fonte-titulo`): grotesca de contraste irregular, com cara de letreiro pintado à mão. No peso extra-bold ela vira massa, que é o que o logo "alex" precisa (letras como a carne do hambúrguer).
- **Figtree 400/700** (`--fonte-texto`): geométrica simples e muito legível em tela pequena, para preços e descrições. Não compete com o título.
- Carregadas pelo Google Fonts com `display=swap`. Escala fluida com `clamp()` de 320 px a 1280 px. Texto corrido limitado a `65ch`.

## Forma

- **`--raio: 0.25rem` (4 px)**: canto de papelão cortado e de etiqueta de preço. Um raio de 0 fica frio demais, e 12 a 16 px lembra aplicativo de banco. 4 px tira a aresta sem amaciar a marca de rua.
- Exceção única: `--raio-selo: 50%`, porque o selo de aberto/fechado é um adesivo redondo.
- Bordas de 2 px em marrom, sem sombras suaves na interface: separação por cor e traço, como embalagem impressa. A única sombra é a dos pratos recortados.

## A coisa memorável

O **selo "aberto agora / abre às 18h"**: adesivo redondo (mostarda aberto, kraft fechado) ao lado do botão de pedir, que muda conforme o horário de Brasília (`js/horario.js`). Responde à pergunta de quem pede delivery à noite antes de ela ser feita. Anima uma vez ao carregar ("carimbo": gira e assenta). É o único movimento automático da página; o outro, nos pratos, só acontece quando a pessoa interage. Os dois ficam desligados com `prefers-reduced-motion`.

Apoio: a logo ilustrada, com as letras de ALEX feitas de ingredientes (ver "Logo: cores de exceção").

## Logo: cores de exceção

A logo (`assets/logo.svg`, `logo-negativo.svg`, `favicon.svg`) é uma ilustração: hambúrguer de lado em que cada letra de ALEX é um ingrediente (A de queijo, L de carne, E de bacon sobre alface, X de fritas com tomate atrás). Contorno marrom `#2B1810` grosso, cores planas. Além dos 4 tokens, ela usa estas cores, **só dentro da ilustração**. Elas nunca entram no `tokens.css` nem no resto do site:

| Cor | Uso |
|---|---|
| `#F5A54A` | pão (tostado, entre o laranja e a mostarda) |
| `#FFD27A` | brilho único do pão |
| `#FFD866` | queijo derretido sobre o A |
| `#8A4426` | carne (mais clara que o contorno, para se separar dele) |
| `#C9503A` | bacon |
| `#7FA83A` | alface (verde oliva, puxado para o quente) |
| `#D93A2A` / `#F07A5C` | tomate e miolo do tomate |

Versões: `logo.svg` para fundo laranja ou creme (guardada, sem uso na página atual); `logo-simbolo.svg` (só a ilustração, contorno creme) para o cabeçalho marrom; `logo-negativo.svg` para fundo marrom (nome em creme e um contorno creme em volta do hambúrguer, como adesivo); `favicon.svg` só com o hambúrguer em camadas, sem letras.

## Regra 60/30/10 por seção

| Seção | Fundo | 30% marrom | 10% mostarda |
|---|---|---|---|
| Cabeçalho | marrom | faixa inteira; ilustração sem o nome (`logo-simbolo.svg`); nome em texto só no desktop | hover do menu |
| Hero | laranja | botão "Pedir no WhatsApp" (marrom + creme), faixa divisória logo abaixo | selo aberto (fechado = kraft) |
| Cardápio | laranja | etiquetas das categorias | etiqueta de preço com borda marrom |
| Como pedir | **marrom** | seção inteira (creme) | marcador numerado de cada passo |
| Onde estamos | laranja | dia de hoje (marrom + creme) e borda do quadro | quadro de horários (mostarda + marrom) |
| Rodapé | marrom | `logo-negativo.svg`, nome, aviso em kraft | botão "Pedir no WhatsApp" |
| Botão fixo (celular) | - | marrom + creme | borda mostarda |

As áreas alternam: hero laranja, faixa marrom, cardápio laranja, "Como pedir" marrom, "Onde estamos" laranja, rodapé marrom. O cardápio fica no laranja porque é a seção mais longa.

### Imagens dos pratos
Cinco imagens geradas por IA, recortadas com fundo transparente e listadas em `CREDITOS.md`. O hambúrguer clássico abre o hero e fica inteiro dentro dele, com folga antes da faixa. No cardápio, os cinco formam uma fileira de mesma altura, apoiados na mesma linha, só com imagem, nome e frase; o preço fica na lista por categorias logo abaixo. A sombra suave existe só nesses recortes, para assentá-los no laranja. "Como pedir" e "Onde estamos" ficam sem imagem de prato.

Medição por screenshot com a faixa divisória, contando só as áreas nas 3 cores da paleta. Página inicial: 375 px = 65% laranja, 27% marrom, 9% mostarda; 1280 px = 68/26/5. Página do prato (Alex Clássico): 375 px = 66/33/1; 1280 px = 73/27/0. Nela a mostarda aparece só no preço, nos traços e nas estrelas, então a proporção fica abaixo do alvo.

### Faixa divisória
Componente único (`.faixa`), usado entre o hero e o cardápio e entre o detalhe do prato e "Veja também". Fundo marrom, frases em creme, caixa-alta e fonte de título (15,21:1), estrelas mostarda (10,94:1). As frases vêm de `js/dados.js`. Corre devagar da direita para a esquerda, em loop, e para com o mouse em cima ou com foco pelo teclado. A primeira lista é lida pelo leitor de tela; as cópias têm `aria-hidden`. Com `prefers-reduced-motion`, fica parada, com uma única lista que quebra linha.

### Fileira de pratos
Nome em `--texto-prato`, traço mostarda de 2,5rem por 4px com contorno marrom (a mostarda sobre o laranja tem só 1,98:1, então o traço é decorativo e precisa do contorno) e frase em marrom, peso 500. O nome é um link para `prato.html?item=id`, e a área de clique cobre o item inteiro. No hover, a imagem sobe 6px com sombra maior; ao pressionar, cresce 8% e inclina 4°, só com CSS, sem atrasar a navegação. Tudo usa `translate`, `scale` e `rotate`, que não mexem no layout, e fica desligado com `prefers-reduced-motion`.

### Página do prato (`prato.html`)
Modelo único preenchido por `js/prato.js`: voltar, imagem recortada, nome com traço, descrição, preço, ingredientes, pedido e "Veja também". Os ingredientes são trechos da descrição, separados por estrelas mostarda com contorno marrom, decorativas. Há um só botão de pedido, com a mensagem do prato: no desktop fica no texto; no celular fixa no rodapé da tela, mantendo a mesma posição na ordem do teclado.

### Componentes (`css/componentes.css`)
- **Botão primário**: sobre laranja, marrom + creme (hover: mostarda + marrom); sobre marrom, mostarda + marrom (hover: só contorno mostarda). **Secundário**: contorno marrom (hover: preenchido). **Desativado**: tracejado, sem preenchimento.
- **Foco**: anel de 3px; `--cor-foco` é marrom em áreas laranja e mostarda em áreas marrons. No botão fixo o anel fica por dentro, para aparecer sobre qualquer seção.
- **Selo**: adesivo redondo com borda e tracejado marrom, ao lado do botão do hero. Aberto = mostarda; fechado = kraft. Texto vem de `statusDaLoja`.
- **Comanda**: nome · linha pontilhada (largura mínima, nunca some) · etiqueta de preço. Duas colunas a partir de 60em.

## Fora de propósito

- Modo escuro separado: a paleta já é quente e escura nas áreas marrons; o briefing não pede.
- Imagem como fundo do hero: texto sobre imagem derruba o contraste.
- Gradientes, sombras em blocos e cards: a fileira de pratos não tem caixa, e o cardápio completo é lista de comanda.
- Texto branco ou creme sobre laranja; mostarda sobre laranja sem borda.
- Animação de entrada por seção: só o selo anima sozinho; os pratos reagem ao mouse e à pressão.
- Rótulos em caixa-alta antes dos títulos e numeração decorativa.
