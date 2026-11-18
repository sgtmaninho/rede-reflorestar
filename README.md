# Rede Reflorestar

🔗 **Site no ar:** https://sgtmaninho.github.io/rede-reflorestar/

## Descrição do projeto
Protótipo de site de uma startup ambiental de Brasília. A pessoa calcula a pegada de carbono da casa e adota mudas nativas do cerrado, que são plantadas e acompanhadas por 2 anos em áreas degradadas do Distrito Federal.

Projeto acadêmico do curso Programador Java (SENAI), feito com HTML, Bootstrap 5 e JavaScript.

## Seções do site
- **Carrossel:** 3 slides (plantio, espécies nativas, mutirões)
- **Faixa de números:** meta da temporada com contador animado e barra de progresso
- **Quem somos:** imagem e texto sobre fundo ilustrado do cerrado
- **O que fazemos:** plantio, manutenção, educação e empresas
- **Espécies:** cards com filtro (ipê-amarelo, pequizeiro, baru, buriti, cagaita, jatobá-do-cerrado)
- **Calculadora:** estimativa de CO₂ por ano e quantidade de mudas para compensar
- **Nosso viveiro:** vídeo de fundo e galeria que abre a foto em tela grande
- **Adote:** planos mensais Broto, Copa e Mata
- **Mutirões:** tabela com as próximas datas
- **Contato:** formulário com validação e máscara de telefone
- **Perguntas frequentes:** accordion em duas colunas
- **Localização:** dados e mapa do viveiro parceiro, o Viveiro Brasília Delivery (Jardim Botânico - DF)
- **Rodapé:** navegação e redes sociais, mais um botão flutuante do WhatsApp

## Paleta de cores
Inspirada no cerrado:

| Cor | Código | Uso |
|---|---|---|
| Noite | `#0f2419` | Fundos escuros, navbar e rodapé |
| Mata | `#1f4a33` | Cor principal da marca |
| Folha | `#3f7d5a` | Detalhes e barras |
| Ipê | `#f2c230` | Destaques e botões |
| Capim | `#e9ead8` | Fundos claros |
| Terra | `#9c4a2c` | Faixa de aviso e mutirões |

## Tipografia
- **Títulos:** Big Shoulders Display (Google Fonts), em caixa alta
- **Textos:** Work Sans (Google Fonts)

## Tecnologias utilizadas
- **HTML5 semântico** (`header`, `nav`, `main`, `section`, `footer`)
- **Bootstrap 5.3** via CDN: Navbar, Carousel, Grid, Cards, Accordion, Modal, Progress, Alert, Badge, Tabela, Formulários e validação
- **Bootstrap Icons** via CDN
- **CSS próprio** (`style.css`) para as cores da marca e efeitos (`repeating-radial-gradient`, `conic-gradient`, animações)
- **JavaScript puro**: modo escuro com `localStorage`, contador, filtro, calculadora, Modais, galeria, máscara de telefone e validação

## Como trocar as imagens
As ilustrações ficam na pasta `img/`. Para usar fotos reais:
1. Coloque a foto na pasta `img/` (por exemplo, `slide-1.jpg`).
2. No `index.html`, troque `img/slide-1.svg` por `img/slide-1.jpg`.

Para o vídeo de fundo do viveiro, crie a pasta `video/` e coloque um arquivo chamado `viveiro.mp4`. Enquanto ele não existir, aparece a imagem `img/galeria-1.svg`.

## Lista de tarefas
- [x] Estrutura da página com HTML semântico
- [x] Layout responsivo com Bootstrap (mobile-first)
- [x] Carrossel, cards, accordion, tabela e modais
- [x] Calculadora de pegada de carbono em JavaScript
- [x] Formulário com validação
- [x] Modo escuro
- [x] Testes de responsividade (computador e celular)
- [ ] Fotos e vídeo reais do viveiro
- [x] WhatsApp, endereço e mapa do viveiro parceiro (Viveiro Brasília Delivery)
- [ ] Link real do Instagram
- [ ] Publicação no GitHub Pages

## Como abrir
Baixe a pasta e abra o `index.html` no navegador, ou use a extensão Live Server do VS Code. Para carregar o Bootstrap, os ícones, as fontes e o mapa, é preciso estar conectado à internet.

## Observação
Os fatores de emissão da calculadora são médias aproximadas, usadas apenas para fins educativos. Preços, planos e datas de mutirões são exemplos do protótipo. Os dados de endereço e contato são do Viveiro Brasília Delivery, viveiro parceiro.

## Autor
**3º Sgt Edvaldo Pinto Maninho Júnior**, curso Programador Java (SENAI), Professor Edgar.
