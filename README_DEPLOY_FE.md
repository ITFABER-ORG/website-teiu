# Guia de Deploy do Frontend — Website TEIÚ

## 1. Entendendo a infraestrutura

O projeto tem três partes, hospedadas separadamente:

| Parte | Onde fica | O que é |
|---|---|---|
| Frontend (site público) | `public_html/` no domínio principal (`teiu.com.br`) | React + Vite, buildado e servido como arquivos estáticos (`index.html` + pasta `assets/`) |
| API pública | `public_html/api/` | Laravel. A URL pública é `https://teiu.com.br/api/public` (não é um subdomínio próprio, é uma subpasta dentro do `public_html`) |
| CMS (editor do site) | subdomínio `cms.teiu.com.br` | Laravel completo, separado. A URL pública é `https://cms.teiu.com.br/public` |

Ponto crítico: **a API e o CMS são hosts diferentes**, mesmo rodando código parecido. Imagens de conteúdo (fotos de produtos, banners, fundador, etc.) são servidas pelo **CMS** (`cms.teiu.com.br/public/storage/...`), não pela API pública. Se você apontar a variável errada para o host errado, o texto/JSON carrega normalmente (API responde), mas as imagens dão **403 Forbidden** silenciosamente — o site parece "quase" funcionando, o que torna fácil não notar antes de publicar.

## 2. As variáveis de ambiente (`.env`)

O `.env` **nunca é versionado no Git** (está no `.gitignore` de propósito, por segurança). Isso significa: ao clonar o repositório, ninguém vai ter os arquivos `.env`. Eles precisam ser criados manualmente, sempre.

Existem dois `.env` diferentes e não devem ser confundidos:

### `.env` (raiz do projeto React) — para desenvolvimento local
Usado pelo `npm run dev`. Aponta para um backend local (ex: `php artisan serve`).
```
VITE_API_URL=http://127.0.0.1:8000
VITE_CMS_URL=http://127.0.0.1:8000
```
(localmente os dois costumam apontar pro mesmo Laravel rodando na sua máquina, já que normalmente só se sobe a API local, não o CMS separado)

### `.env.production` (raiz do projeto React) — para o build de produção
Usado automaticamente pelo `npm run build`. **Esses valores ficam gravados dentro do JS final**, então qualquer erro aqui só aparece depois do build, em produção.
```
VITE_API_URL=https://teiu.com.br/api/public
VITE_CMS_URL=https://cms.teiu.com.br/public
```

**Atenção**: confira sempre se esses valores ainda são os corretos antes de buildar — eles podem mudar se a empresa migrar de servidor, trocar de domínio, etc. Para confirmar a URL real em uso, abra o site em produção, abra o DevTools (F12) → aba Network, recarregue a página, e veja a `Request URL` de qualquer chamada de API ou imagem.

### Por que isso importa tanto
O Vite **não lê variáveis de ambiente em tempo real no navegador**. Ele faz um "find and replace" de `import.meta.env.VITE_X` pelo valor literal, no momento do build. Ou seja: se você rodar `npm run build` com o `.env.production` errado, vai gerar um pacote de JS com a URL errada **codificada dentro do arquivo**, e a única forma de corrigir é editar o `.env.production` e buildar de novo — não dá pra "consertar depois" sem rebuildar.

## 3. Processo de deploy passo a passo

### 3.1 Antes de tudo: ambiente local funcionando
Nunca edite e suba direto. Tenha o projeto rodando localmente (`npm run dev` + API local) e valide a mudança ali primeiro.

Se for a primeira vez rodando o projeto numa máquina nova:
```bash
# Na pasta da API
composer install
cp .env.example .env
php artisan key:generate
# editar .env com dados do banco (local, nunca aponte para o banco de produção direto)
php artisan serve

# Na raiz do projeto React, em outro terminal
npm install
# criar o .env local (ver seção 2)
npm run dev
```

### 3.2 Build de produção
```bash
npm run build
```
Isso gera a pasta `dist/` (ou o nome configurado em `vite.config.js`), contendo `index.html` e uma pasta `assets/`.

### 3.3 Testar o build antes de subir
```bash
npm run preview
```
Abra a URL local que aparecer (geralmente `http://localhost:4173`) e navegue por todas as páginas principais.

**Se aparecer 403 (Forbidden) em alguma imagem durante o `npm run preview`, não ignore — isso já aconteceu por uma causa real:** o `VITE_CMS_URL` apontando para o host errado (API em vez de CMS, ou vice-versa). Texto e dados (JSON) carregam normalmente mesmo com a URL errada, porque a rota da API existe nos dois hosts — só as imagens de storage falham, e falham com 403, não com um erro óbvio de "URL não encontrada". Isso torna fácil não notar o problema até já estar em produção.

Sempre que vir 403 no preview, confirme abrindo o arquivo JS gerado em `dist/assets/index-*.js` num editor e buscando (Ctrl+F) pelos domínios `teiu.com.br` e `cms.teiu.com.br`. Compare com o que está realmente em produção: abra o site real, DevTools → Network, veja a `Request URL` de uma chamada de imagem, e confira se bate com o host que aparece no seu build. Se os hosts não conferem, corrija o `.env.production` e gere o build de novo — não suba para produção até o preview carregar as imagens corretamente.

### 3.4 Backup em produção (cPanel File Manager → `public_html`)

**Nunca delete o que já está em produção. Sempre renomeie.** Backup malfeito é a diferença entre "5 minutos para reverter" e "site da empresa fora do ar enquanto você investiga".

Antes de subir qualquer arquivo novo:
- Renomeie `assets/` → `assets_old_AAAAMMDD/` (use a data do dia)
- Renomeie `index.html` → `index_old_AAAAMMDD.html`

Por que isso é crítico: se o novo build tiver qualquer problema não percebido durante o teste local (URL errada, erro de build, regressão em alguma página), reverter é só desfazer esses dois renomes — volta ao estado anterior em segundos, sem stress, sem rebuild de emergência.

Não toque em mais nada dentro de `public_html` além de `assets/` e `index.html` — a pasta `api/` é outro projeto (Laravel), não faz parte do deploy do frontend.

### 3.5 Subir os arquivos novos
Envie o conteúdo de `dist/` (a pasta `assets/` e o `index.html`) para a raiz de `public_html`, mantendo a mesma estrutura.

### 3.6 Validar em produção
Acesse o site real com hard refresh (Ctrl+Shift+R, para evitar cache do navegador) e teste, no mínimo:
- A página que foi alterada
- Todas as outras rotas principais do site (mesmo as que você "não tocou" — uma variável de ambiente errada afeta todas as páginas ao mesmo tempo, não só a que foi editada)
- Que imagens de conteúdo dinâmico (produtos, banners, fotos do CMS) estão carregando

### 3.7 Se algo quebrar
Reverta imediatamente:
- Delete a pasta `assets/` nova, renomeie `assets_old_AAAAMMDD/` de volta para `assets`
- Delete o `index.html` novo, renomeie `index_old_AAAAMMDD.html` de volta para `index.html`

Investigue o problema com calma depois, fora do horário de pico, sem pressa — o site já está de volta ao normal.

### 3.8 Depois de confirmar que está tudo certo
Pode manter os backups antigos por alguns dias antes de decidir limpá-los — eles não pesam o suficiente para justificar pressa em apagar.

## 4. Checklist resumido

- [ ] Mudança testada localmente (`npm run dev`)
- [ ] `.env.production` confere com as URLs reais atuais de produção (API e CMS)
- [ ] `npm run build` sem erros
- [ ] `npm run preview` testado, sem erros 403/404 em imagens (se aparecer 403, comparar hosts no JS gerado antes de seguir)
- [ ] Backup feito (`assets_old_AAAAMMDD`, `index_old_AAAAMMDD.html`) — confirmado que existe antes de subir o novo
- [ ] Arquivos novos enviados (`assets/` e `index.html`)
- [ ] Site testado em produção com hard refresh, todas as páginas principais, atenção especial a imagens
- [ ] Se algo der errado: reverter primeiro, investigar depois