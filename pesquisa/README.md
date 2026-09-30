# Pesquisa do roteiro China + Japão (30/10 – 30/11/2026)

Conteúdo de trabalho para o guia — cada arquivo aqui é a fonte da verdade de uma página do site final. Um build determinístico (`build/build.js`) converte cada `.md` num fragmento HTML pronto para a SPA em `site/`, gerando `dist/`. Ver arquitetura completa no `CLAUDE.md` do repo.

## Front matter (obrigatório desde a refatoração de arquitetura)

Todo `.md` aqui precisa de um bloco YAML no topo — é o único dado estrutural que o build usa (a prosa abaixo não muda em nada):

```yaml
---
type: city            # city | atracao | pais | provincia
slug: xian
title: "Xi'an — a Rota da Seda que nunca terminou de chegar"
emoji: "🏛️"
order: 2
days: [2, 3, 4]        # city/atracao
city: xian              # atracao → cidade-mãe
provincia: shaanxi      # city → província-mãe (opcional)
region: "Shaanxi, China"
---
```
Para páginas de `aprofundamento/`: `type: pais|provincia`, `slug`, `topico` (slug livre — biblioteca aberta, não enum fechado), `title`, `order`. Só `type`/`slug`/`title` são obrigatórios — `build/validate.js` avisa (sem quebrar o build) quando falta o resto.

O corpo continua exatamente o formato que `travel-writer` já produz: `# Título`, blockquote de brief (descartado na renderização — é nota de processo), `## Módulos`, e a tabela final "Imagens por seção — pesquisadas" (também não renderizada — só alimenta o casamento heurístico de imagem por módulo).

## Como está organizado

- **`cidades/`** — um arquivo por cidade/parada, com visão geral + roteiro hora a hora completo (walking tour) + comida local + imagens.
- **`atracoes/`** — um arquivo por atração que vira página própria, com dossiê completo: história, arquitetura/engenharia, contexto cultural, curiosidades, o que observar, informações práticas.
- **`aprofundamento/`** — nova área (ver `CLAUDE.md`): `paises/<pais>/<topico>.md` (ex.: `paises/china/historia.md`, `paises/china/etnias.md`) e `provincias/<provincia>/<topico>.md`. País é o hub; província aparece como prateleira dentro da página do país. **Use a skill `travel-deepdive-writer` para escrever essas páginas, nunca `travel-content-planner`** — o pipeline de cidade/atração (place-finder/event-finder/brief de viajante-e-data) não se aplica a conteúdo de referência como dinastia/etnia/geografia/culinária.

Cada arquivo de cidade linka para os arquivos de atração correspondentes via `city:` no front matter — não precisa mais listar isso à mão em lugar nenhum.

## Índice — Cidades

| # | Arquivo | Dias | Atrações próprias |
|---|---|---|---|
| 1 | [cidades/01-pequim.md](cidades/01-pequim.md) | 1 | (sem página própria — escala) |
| 2 | [cidades/02-xian.md](cidades/02-xian.md) | 2-4 | exercito-terracota, muralha-xian, bairro-muculmano, pagode-ganso-selvagem, torre-sino-tambor |
| 3 | [cidades/03-chongqing.md](cidades/03-chongqing.md) | 5-6 | hongyadong, liziba, jiefangbei, nanshan, ciqikou |
| 4 | [cidades/04-zhangjiajie.md](cidades/04-zhangjiajie.md) | 7-10 | yuanjiajie-avatar, tianzi-mountain, glass-bridge, tianmen-mountain, golden-whip-stream |
| 5 | [cidades/05-fenghuang.md](cidades/05-fenghuang.md) | 11-12 | hongqiao-fenghuang, wanming-pagoda, muralha-fenghuang, shen-congwen, rio-tuojiang-diaojiaolou |
| 6 | [cidades/06-guizhou.md](cidades/06-guizhou.md) | 13-15 | xijiang, zhaoxing, dong-grand-song |
| 7 | [cidades/07-yangshuo-guilin.md](cidades/07-yangshuo-guilin.md) | 16-18 | rio-li-cruzeiro, west-street, moon-hill, longsheng |
| 8 | [cidades/08-shenzhen.md](cidades/08-shenzhen.md) | 19 | huaqiangbei, oct-loft, ping-an-shenzhen-bay |
| 9 | [cidades/09-hongkong.md](cidades/09-hongkong.md) | 20 | victoria-peak, star-ferry, temple-street, avenue-of-stars, man-mo-temple, sham-shui-po |
| 10 | [cidades/10-kurokawa.md](cidades/10-kurokawa.md) | 21 | kurokawa-onsen |
| 11 | [cidades/11-yufuin.md](cidades/11-yufuin.md) | 22 | lago-kinrin, monte-yufu, yunotsubo-kaido |
| 12 | [cidades/12-fukuoka.md](cidades/12-fukuoka.md) | 23-28 | yatai, fukuoka-tower-momochi, dazaifu, ohori-park-castelo, kushida-shrine, canal-city |

Dia 29 (Xangai → São Paulo, retorno) não tem arquivo próprio — é só rota de conexão, sem exploração turística, igual ao "↩ São Paulo" do guia original.

## Índice — Atrações (44 páginas)

Ver pasta [`atracoes/`](atracoes/) — um arquivo `.md` por atração, nomeado com slug (mesmo padrão que viraria `tpl-page-<slug>` no `guia.html`).

## ⚠️ Pendências de imagem

Marcadas com 🟡 dentro dos arquivos — imagens Unsplash/Pexels genéricas (tematicamente corretas, mas não fotos literais do local) ou imagens Wikimedia encontradas mas **não reconfirmadas por rate-limit** da API durante esta sessão:

- **Confirmadas via Wikimedia** (prioridade sobre Unsplash/Pexels genéricas): Xijiang (2), Zhaoxing (2), Fenghuang (1 — Hong Qiao/Red Bridge), Huaqiangbei (2).
- **Encontradas mas pendentes de reconfirmação** (rate-limit 429 durante a sessão — rodar `curl -s -o /dev/null -w "%{http_code} %{content_type}" -L <url>` de novo antes de usar): OCT Loft (2), Man Mo Temple (2), Canal City (1), Kushida Shrine (1).
- **Sem imagem específica encontrada**: Ciqikou Ancient Town, Casa Natal de Shen Congwen, Muralha Antiga de Fenghuang (a candidata anterior era da Grande Muralha de Mutianyu em Pequim — incorreta, removida).

## Próximos passos sugeridos

1. Revisar o conteúdo (posso ajustar tom, cortar/expandir qualquer trecho).
2. Resolver as pendências de imagem acima (reconfirmar as 🟡 ou buscar mais).
3. Rodar `node build/build.js` (na raiz do repo) — gera `dist/` a partir de tudo que estiver aqui. Front matter já foi migrado automaticamente em todos os arquivos existentes; páginas novas precisam do bloco YAML descrito acima desde o início.
